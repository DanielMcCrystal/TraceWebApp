import './ArtifactDetails.css';
import 'prismjs/themes/prism.css';

import { Cell, Column, Table } from "@blueprintjs/table";
import { getArtifactClass, getArtifactClassName } from '../ArtifactInterface';
import { getLinkThreshold, getTraceLinks } from '../TraceabilityInterface';

import { Icon } from '@blueprintjs/core';
import Prism from 'prismjs';
import React from 'react';

export default class ArtifactDetails extends React.Component {

	state = {
		artifactInfo: null,
	}

	artifactClass = null;

	constructor(props) {
		super(props);

		this.codeRef = React.createRef();
	}

	loadArtifact(artifactInfo, artifactClass) {
		this.artifactClass = artifactClass;
		this.setState({artifactInfo: artifactInfo}, () => {
			if (this.artifactClass !== "req") {
				Prism.highlightElement(this.codeRef.current);
			}
			
		});
	}

	unloadArtifact() {
		this.setState({artifactInfo: null});
	}

	getArtifactTitle() {
		return this.state.artifactInfo ? this.state.artifactInfo.id : '';
	}

	getArtifactContent() {
		if (this.artifactClass === 'req') {
			return this.state.artifactInfo ? this.state.artifactInfo.content : '';
		} else {
			console.log(1);
			return <code ref={this.codeRef} className="language-java" style={{margin: 0}}>
				{this.state.artifactInfo ? this.state.artifactInfo.content : ''}
			</code>
		}
		
	}

	getNoSelectionContent() {
		return (
			<div style={{display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
				<p>Please select a source artifact</p>
			</div>
		)
	}

	getTraceLinksTable() {
		const traceLinks = getTraceLinks(this.state.artifactInfo.id);
		const traceLinksList = Object.keys(traceLinks).map((targetName) => {
			return {
				artifactName: targetName,
				traceValue: traceLinks[targetName]
			}
		});
		traceLinksList.sort((a, b) => {
			return b.traceValue - a.traceValue;
		});
		const valueCellRenderer = (index) => {
			return <Cell>{traceLinksList[index].traceValue}</Cell>
		}

		const targetNameCellRenderer = (index) => {
			return <Cell>{traceLinksList[index].artifactName}</Cell>
		}

		const linkThreshold = getLinkThreshold();
		const linkStatusCellRenderer = (index) => {
			const linkStatus = traceLinksList[index].traceValue > linkThreshold;
			return <Cell style={{display: 'flex', justifyContent: 'center'}}>
				<Icon icon={linkStatus ? 'link' : 'delete'} color={linkStatus ? 'green' : 'red'}/>
			</Cell>
		}

		const artifactTypeCellRenderer = (index) => {
			return <Cell>
				{getArtifactClassName(getArtifactClass(traceLinksList[index].artifactName))}
			</Cell>
		}

		return <Table numRows={Object.keys(traceLinks).length}>
			<Column name="Link Status" cellRenderer={linkStatusCellRenderer} />
			<Column name="Value" cellRenderer={valueCellRenderer} />
			<Column name="Filename" cellRenderer={targetNameCellRenderer} />
			<Column name="Type" cellRenderer={artifactTypeCellRenderer} />
		</Table>
	}

	getDetailsContent() {
		return (
			<div style={{flexGrow: 1, display: 'flex', flexDirection: 'column', maxHeight: '100%'}}>
				<div style={{padding: 15}}>
						<h1 style={{margin: 0,}}>{this.getArtifactTitle()}</h1>
				</div>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: 10, flexGrow: 0, maxHeight: '40%'}}>

					<pre 
					style={{
						margin: 0, 
						fontFamily: 'Courier', 
						whiteSpace: this.artifactClass === 'req' ? 'pre-wrap' : null,
						flexGrow: 1,
						backgroundColor: 'whitesmoke',
						borderWidth: 1,
						borderColor: 'black',
						borderStyle: 'solid',

						padding: 10,
					}}
					>
						{this.getArtifactContent()}
					</pre>

				</div>
				<div style={{display: 'flex', flexDirection: 'column', padding: 10, paddingTop: 0, flexGrow: 1,}}>
					<h2 style={{margin: 0}}>Trace Links</h2>
					{this.getTraceLinksTable()}
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="artifactDetailsContainer">
				<div className="artifactDetails">
					{this.state.artifactInfo ? this.getDetailsContent() : this.getNoSelectionContent()}
					<div style={{height: 20}}/>
				</div>
			</div>
		);
	}
}
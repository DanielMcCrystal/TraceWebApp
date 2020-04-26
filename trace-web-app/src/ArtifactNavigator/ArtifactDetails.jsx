import './ArtifactDetails.css';
import 'prismjs/themes/prism.css';

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

	getDetailsContent() {
		return (
			<div style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
				<div style={{padding: 15}}>
						<h1 style={{margin: 0,}}>{this.getArtifactTitle()}</h1>
				</div>
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: 10, flexGrow: 1, backgroundColor: 'blue'}}>

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
				<div style={{display: 'flex', padding: 10, flexGrow: 1,}}>
					<h1 style={{margin: 0}}>Trace Links</h1>
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
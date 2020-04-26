import './ArtifactBrowser.css';

import {HTMLSelect, InputGroup} from '@blueprintjs/core';

import ArtifactPreviewCard from './ArtifactPreviewCard';
import React from 'react';
import { getAllArtifacts } from '../ArtifactInterface';

export default class ArtifactBrowser extends React.Component {

	state = {
		artifactsLoaded: false,
		artifactInfos: null,
	}

	currentArtifactClass = 'req';

	constructor(props) {
		super(props);

		this.artifactCardRefs = [];
		this.currentlySelectedArtifactIndex = -1;
	}

	fetchArtifacts(artifactClass) {
		getAllArtifacts(artifactClass).then((artifactInfos) => {
			this.artifactCardRefs =  artifactInfos.map((artifactInfo) => React.createRef());
			this.setState({
				artifactsLoaded: true,
				artifactInfos: artifactInfos
			});
		});
	}

	deselectCurrentlySelectedArtifact() {
		if (this.currentlySelectedArtifactIndex !== -1) {
			this.artifactCardRefs[this.currentlySelectedArtifactIndex].current.deselect();
		}
		this.currentlySelectedArtifactIndex = -1;
	}

	componentDidMount() {
		this.fetchArtifacts(this.currentArtifactClass);
	}

	getArtifactPreviewCards() {
		return this.state.artifactInfos.map((artifactInfo, index) => {
			return (
				<div style={{height: '150px', padding: '10px 20px', display: 'flex', alignItems: 'stretch', maxWidth: 'inherit'}}>
					<ArtifactPreviewCard 
						ref={this.artifactCardRefs[index]} 
						artifactInfo={artifactInfo} 
						onClick={() => {
							this.deselectCurrentlySelectedArtifact()
							this.currentlySelectedArtifactIndex = index;
							this.props.onArtifactSelect(artifactInfo, this.currentArtifactClass);
						}}
					/>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="artifactBrowserContainer">
				<div className="artifactBrowser">
					<div className="artifactClassSelectorContainer">
						<HTMLSelect onChange={(event) => {
							this.deselectCurrentlySelectedArtifact();
							this.props.onArtifactDeselect();
							this.currentArtifactClass = event.currentTarget.value;
							this.fetchArtifacts(event.currentTarget.value);
						}}>
							<option value="req">Requirements</option>
							<option value="src">Source Code</option>
						</HTMLSelect>
					</div>

					<div className="artifactFiltersContainer">
						<InputGroup large className="artifactFilters" leftIcon={'search'}/>
					</div>
					<div className="artifactPreviewsContainer">
						{this.state.artifactsLoaded ? this.getArtifactPreviewCards() : null}
					</div>
					<div style={{height: 20}}/>
				</div>
			</div>
		);
	}
}
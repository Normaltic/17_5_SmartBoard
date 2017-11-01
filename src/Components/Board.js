import React from 'react';

import io from 'socket.io-client';
import { connect } from 'react-redux';
import * as PageAction from '../reducers/Paints';
import * as ToolAction from '../reducers/Tools';

import Canvas, { toolMap } from './Canvas/Canvas';
import tools from './Canvas/tools';

import BottomMenu from './BottomMenu/MenuContainer';
import ToolMenu from './ToolMenu/ToolMenu';

class Board extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			tool: tools.TOOL_PENCIL,
			socket: io()
		};

		this.handleTool = this.handleTool.bind(this);
	}


	handleTool(toolName) {
		this.setState({
			tool: toolName
		});
	};

	render() {
		return (
			<div style={{width: '100%', heigth: '100%'}}>
				<Canvas
					selectedPage={this.props.selectedPage}
					pageData={this.props.pageData}
					pushItem={this.props.pushItem}
					updatePreview={this.props.updatePreview}
					tool={this.props.toolType}
					toolOption={this.props.toolOption}
					socket={this.state.socket}/>
				<ToolMenu />
				<BottomMenu 
					selectedPage={this.props.selectedPage}
					pageData={this.props.pageData}
					pageLength={this.props.pageLength}
					socket={this.state.socket}/>
			</div>
		)
	}
};

const mapStateToProps = (state) => ({
	selectedPage: state.Paints.get('selectedPage'),
	pageLength: state.Paints.get('pageLength'),
	pageData: state.Paints.get('pageData'),
	toolType: state.Tools.get('toolType'),
	toolOption: state.Tools.get('toolOption')
});

const mapDispatchToProps = (dispatch) => ({

	updatePreview: (pageIndex, preview) => dispatch(PageAction.updatePreview({pageIndex, preview})),
	pushItem: (pageIndex, item) => dispatch(PageAction.pushItem({pageIndex, item}))
});

export default connect(mapStateToProps,mapDispatchToProps)(Board);

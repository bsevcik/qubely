const { __ } = wp.i18n;
const { InspectorControls, BlockControls } = wp.blockEditor;
const { Component, Fragment, createRef } = wp.element;
const { PanelBody, Toolbar, Tooltip, Dropdown } = wp.components;
const {
	Alignment,
	Range,
	Color,
	ContextMenu: { ContextMenu, handleContextMenu },
	gloalSettings: { globalSettingsPanel, animationSettings, interactionSettings },
	Inline: { InlineToolbar },
	withCSSGenerator,
	InspectorTabs,
	InspectorTab,
} = wp.qubelyComponents;

import icons from "../divider/icon";
const dividerOptions = [
	"fill",
	"dot",
	"dash",
	"branch",
	"dashes",
	"leaf",
	"line1",
	"line2",
	"line3",
	"line4",
	"line5",
	"line6",
	"line7",
	"line8",
	"line9",
	"line10",
	"line11",
	"line12",
	"line13",
	"liner",
	"mustache",
	"shadow",
	"slash",
	"spring",
	"valla",
	"wave1",
	"wave2",
	"wave3",
];
class Edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			device: "md",
			isOpen: false,
			spacer: true,
		};
		this.qubelyContextMenu = createRef();
	}

	renderDividerOptions = () => {
		const { setAttributes } = this.props;
		return (
			<div className="qubely-divider-picker-options">
				<ul>
					{dividerOptions.map((item, index) => (
						<li
							key={index}
							className={`qubely-divider-picker-option ${index}`}
							onClick={() => {
								setAttributes({ style: item });
							}}
						>
							{icons[item]}
						</li>
					))}
				</ul>
			</div>
		);
	};

	render() {
		const {
			name,
			clientId,
			attributes,
			isSelected,
			setAttributes,
			attributes: {
				uniqueId,
				className,
				color,
				height,
				width,
				alignment,
				style,
				animation,
				globalZindex,
				enablePosition,
				selectPosition,
				positionXaxis,
				positionYaxis,
				hideDesktop,
				hideTablet,
				hideMobile,
				globalCss,
				interaction,
			},
		} = this.props;

		const { device } = this.state;
		return (
			<Fragment>
				<InspectorControls key="inspector">
					<InspectorTabs tabs={["style", "advance"]}>
						<InspectorTab key={"style"}>
							<PanelBody title={__("Divider Options")} initialOpen={true}>
								<Dropdown
									className={"qubely-divider-picker"}
									contentClassName={"qubely-divider-picker-content"}
									position="bottom center"
									renderToggle={({ isOpen, onToggle }) => (
										<div className="shape-divider-options">
											<button onClick={onToggle} aria-expanded={isOpen}>
												<Tooltip text={isOpen ? __("Close options") : __("Find more options")}>
													{icons[style]}
												</Tooltip>
											</button>
										</div>
									)}
									renderContent={() => this.renderDividerOptions()}
								/>
								<Alignment
									label={__("Alignment")}
									alignmentType="content"
									disableJustify
									value={alignment}
									onChange={(val) => setAttributes({ alignment: val })}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>

							<PanelBody title={__("Divider Settings", "qubely")} initialOpen={true}>
								<Color
									label={__("Color")}
									value={color}
									onChange={(val) => setAttributes({ color: val })}
								/>
								<Range
									label={__("Height")}
									value={height}
									onChange={(val) => setAttributes({ height: val })}
									min={0}
									max={15}
									unit={["px", "em", "%"]}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
								<Range
									label={__("Width")}
									value={width}
									onChange={(val) => setAttributes({ width: val })}
									min={0}
									max={1000}
									unit={["px", "em", "%"]}
									responsive
									device={device}
									onDeviceChange={(value) => this.setState({ device: value })}
								/>
							</PanelBody>
						</InspectorTab>
						<InspectorTab key={"advance"}>
							{animationSettings(uniqueId, animation, setAttributes)}
							{interactionSettings(uniqueId, interaction, setAttributes)}
						</InspectorTab>
					</InspectorTabs>
				</InspectorControls>

				<BlockControls>
					<Toolbar
						className="components-dropdown components-dropdown-menu components-toolbar-group"
						label={__("Divider Options", "qubely")}
					>
						<InlineToolbar
							data={[{ name: "InlineSpacer", key: "spacer", responsive: true, unit: ["px", "em", "%"] }]}
							{...this.props}
							prevState={this.state}
						/>
					</Toolbar>
				</BlockControls>

				{globalSettingsPanel({
					enablePosition,
					selectPosition,
					positionXaxis,
					positionYaxis,
					globalZindex,
					hideDesktop,
					hideTablet,
					hideMobile,
					globalCss,
					setAttributes
				})}

				<div
					className={`qubely-block-${uniqueId}${className ? ` ${className}` : ""}`}
					onContextMenu={(event) => handleContextMenu(event, this.qubelyContextMenu.current)}
				>
					<Dropdown
						className={"qubely-divider-picker backend"}
						contentClassName={"qubely-divider-picker-content"}
						position="bottom center"
						renderToggle={({ isOpen, onToggle }) => (
							<div className={`qubely-block-divider`} onClick={onToggle} aria-expanded={isOpen}>
								{style == "fill" || style == "dot" || style == "dash" ? (
									<div className={`qubely-block-divider-style-${style}`} />
								) : (
									icons[style]
								)}
							</div>
						)}
						renderContent={() => this.renderDividerOptions()}
					/>
					<div ref={this.qubelyContextMenu} className={`qubely-context-menu-wraper`}>
						<ContextMenu
							name={name}
							clientId={clientId}
							attributes={attributes}
							setAttributes={setAttributes}
							qubelyContextMenu={this.qubelyContextMenu.current}
						/>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withCSSGenerator()(Edit);

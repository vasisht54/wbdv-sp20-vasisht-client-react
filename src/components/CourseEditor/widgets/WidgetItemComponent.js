import React from "react";
import HeadingWidgetComponent from "./HeadingWidgetComponent";
import ParagraphWidgetComponent from "./ParagraphWidgetComponent";

export default class widgetItemComponent extends React.Component {

    state = {
        editing: false,
        widget: this.props.widget,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.widget.id !== this.props.widget.id) {
            this.setState({
                widget : this.props.widget
            })
        }
    }

    handleWidgetName = () => {
        if(this.state.widget.type === "HEADING")
            return <div>Heading Widget</div>;
        else if(this.state.widget.type === "PARAGRAPH")
            return <div>Paragraph Widget</div>;
    };

    updateSize = (size) => {
        this.setState({
            widget: {
                ...this.state.widget,
                size
            }
        })
    };

    updateText = (text) => {
        this.setState({
            widget: {
                ...this.state.widget,
                text
            }
        })
    };


    updateType = (type) => {
        this.setState({
            widget: {
                ...this.state.widget,
                type
            }
        })
    };

    currentWidgetType = () => {
        switch(this.state.widget.type) {
            case "HEADING": return "HEADING";
            case "PARAGRAPH": return "PARAGRAPH";
        }
    };

    updateTitle = (title) => {
        this.setState({
            widget: {
                ...this.state.widget,
                title
            }
        })
    };

    render() {
        return (
            <div  key={this.state.widget.id}>
                <div className="card col">
                    <div className="row">
                        <div className="col-sm-3"><h3>{this.handleWidgetName()}</h3></div>

                            <div className="col-sm-9">
                                <div className="d-inline-flex float-right pt-1 pl-2">
                                    <button onClick={() => {
                                        this.props.deleteWidget(this.state.widget.id)}}
                                            className="btn btn-danger btn-sm">X</button>
                                </div>
                                <button onClick={() => this.props.editWidget(this.state.widget)} className="btn btn-success float-right">Save</button>
                                <div className="d-inline-flex float-right pr-2 my-auto">
                                    <div className="form-group">
                                        <select value={this.currentWidgetType()} onChange={(e) => this.updateType(e.target.value)} className="form-control">
                                            <option value="HEADING" >Heading</option>
                                            <option value="PARAGRAPH">Paragraph</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="d-inline-flex float-right pr-2 pt-1">
                                    <button className="btn btn-warning btn-sm">
                                        <i className="fas fa-arrow-down"/>
                                    </button>
                                </div>
                                <div className="d-inline-flex float-right pr-2 pt-1">
                                    <button className="btn btn-warning btn-sm">
                                        <i className="fas fa-arrow-up"/>
                                    </button>
                                </div>
                            </div>

                        {
                            this.state.widget.type === "HEADING" &&
                            <HeadingWidgetComponent
                                updateSize = {this.updateSize}
                                updateTitle = {this.updateTitle}
                                updateText = {this.updateText}
                                widget={this.props.widget}/>
                        }
                        {
                            this.state.widget.type === "PARAGRAPH" &&
                            <ParagraphWidgetComponent
                                updateTitle = {this.updateTitle}
                                updateText = {this.updateText}
                                widget = {this.props.widget}/>
                        }
                     </div>
                 </div>
                <br />
            </div>
        )
    }
};
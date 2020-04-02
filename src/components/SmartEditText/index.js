import React from "react";
import submitEditText from "./service";
import "./style.css";

export const TEXT_PLACEHOLDER = "Hello World";

export const STATUS_EDIT_MODE = "STATUS_EDIT_MODE";
export const STATUS_VIEW_MODE = "STATUS_VIEW_MODE";
export const STATUS_LOADING_MODE = "STATUS_LOADING_MODE";

class SmartEditText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editStatus: STATUS_VIEW_MODE,
      text: TEXT_PLACEHOLDER,
      viewText: TEXT_PLACEHOLDER,
      errorMessage: null,
      successIconVisible: false
    };

    this.onclickViewTextHandler = this.onclickViewTextHandler.bind(this);
    this.onEnterClicked = this.onEnterClicked.bind(this);
    this.onChangeTextHandler = this.onChangeTextHandler.bind(this);
  }

  isInViewMode() {
    return this.state.editStatus === STATUS_VIEW_MODE;
  }

  isLoadingMode() {
    return this.state.editStatus === STATUS_LOADING_MODE;
  }

  isInEditOrLoadingMode() {
    return (
      this.state.editStatus === STATUS_EDIT_MODE ||
      this.state.editStatus === STATUS_LOADING_MODE
    );
  }
  onChangeTextHandler(e) {
    this.setState({
      ...this.state,
      text: e.target.value
    });
  }

  onclickViewTextHandler() {
    this.setState({
      ...this.state,
      editStatus: STATUS_EDIT_MODE
    });
  }

   onEnterClicked(e) {
    if (e.keyCode === 13) {
      this.setState({
        ...this.state,
        editStatus: STATUS_LOADING_MODE
      });

      submitEditText(this.state.text)
        .then(data => {
          this.setState({
            ...this.state,
            editStatus: STATUS_VIEW_MODE,
            viewText: this.state.text,
            successIconVisible: true
          });

          setTimeout(() => {
            this.setState({
              ...this.state,
              successIconVisible: false
            });
          }, 2000);
        })
        .catch(error => {
          this.setState({
            ...this.state,
            editStatus: STATUS_VIEW_MODE,
            errorMessage: error.msg,
            viewText: TEXT_PLACEHOLDER
          });

          setTimeout(() => {
            this.setState({
              editStatus: STATUS_VIEW_MODE,
              text: TEXT_PLACEHOLDER,
              errorMessage: null
            });
          }, 2000);
        });
    }
  }

  render() {
    return (
      <div>
        {this.isInViewMode() && (
          <div>
            <h1 onClick={this.onclickViewTextHandler}>{this.state.viewText}</h1>
            {this.state.errorMessage && (
              <div data-testid="error-message">
                <img
                  className="error-icon"
                  src="https://www.freeiconspng.com/uploads/a-red-error-exclamation-sign-meaningful-official-round-26.png"
                  alt="error"
                />
                {this.state.errorMessage}
              </div>
            )}
            {this.state.successIconVisible && (
              <div data-testid="success-message">
                <img
                  className="success-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/768px-Flat_tick_icon.svg.png"
                  alt="success"
                />
              </div>
            )}
          </div>
        )}
        {this.isInEditOrLoadingMode() && (
          <input
            data-testid="edit-input"
            type="text"
            value={this.state.text}
            onChange={this.onChangeTextHandler}
            onKeyDown={this.onEnterClicked}
          ></input>
        )}
        {this.isLoadingMode() && (
          <img
            className="loading"
            src="https://flevix.com/wp-content/uploads/2019/07/Bubble-Preloader-1.gif"
            alt="loading"
          />
        )}
      </div>
    );
  }
}

export default SmartEditText;

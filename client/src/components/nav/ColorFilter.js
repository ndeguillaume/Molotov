import React from "react";
import "../../public/style/colorFilter.css";

export default class ColorFIlter extends React.Component {
  optionClicked(e) {
    const target = e.target.className;
    this.props.setColor(target);
  }

  render() {
    var position =
      this.props.colorIco.current.getBoundingClientRect().left +
      this.props.colorIco.current.offsetWidth / 2 -
      100;
    while (position + 200 > window.innerWidth) position--;
    const styles = {
      filter: {
        left: position + "px",
      },
    };

    var colors = [];
    let i = 0;
    this.props.colors.map((color) => {
      if (this.props.color === `${color}`.split("/")[3].split(".")[0]) {
        colors.push(
          <div
            className={`${color}`.split("/")[3].split(".")[0]}
            onClick={(e) => this.optionClicked(e)}
          >
            <img
              className={`${color}`.split("/")[3].split(".")[0]}
              src={color}
              alt={`${color}`.split("/")[3].split(".")[0]}
            ></img>
          </div>
        );
      } else {
        colors.push(
          <div
            className={`${color}`.split("/")[3].split(".")[0]}
            onClick={(e) => this.optionClicked(e)}
          >
            <img
              className={`${color}`.split("/")[3].split(".")[0]}
              src={this.props.flColors[i]}
              alt={`${color}`.split("/")[3].split(".")[0]}
            ></img>
          </div>
        );
      }
      i++;
    });

    return (
      <div
        style={styles.filter}
        className="filter-options-wrapper colors"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="filter-options-title">Choose the colors</div>
        <div className="filter-options-buttons">
          <div className="button-wrapper">{colors}</div>
        </div>
      </div>
    );
  }
}

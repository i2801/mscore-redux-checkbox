import React, { Component, PropTypes } from 'react';

const propTypes = {
  onPlus: PropTypes.func,
  onSubtract: PropTypes.func,
  onRadomizeColor: PropTypes.func,
  itemArray: React.PropTypes.array
};

function createWarning(funcName) {
  return () => console.warn(funcName + ' is not defined');
}

const defaultProps = {
  onPlus: createWarning('onPlus'),
  onSubtract: createWarning('onSubtract'),
  onRadomizeColor: createWarning('onRadomizeColor'),
  num: 1,
  itemArray: []
};

class CheckBoxItems extends Component {
  constructor(props) {
      super(props);
      this.state = {count: props.itemArray};

  }
  componentWillMount() {
    this.setState({count: {...this.state.count} });
  }

  componentDidMount() {
    console.log(this.state.count);
  }

  handleClick(event) {
    console.log(event.charCode);
  }

  render() {
    var nn = this.props.num;
    var num = (nn)*50;
    var chkItem = [];
    var style = {
      fontSize:'10px',
      display:'inline-block',
      width:'20px',
      textAlign:'right'
    }
    for (var ii = 1; ii <= 50; ii++) {
      let nowNum = num+ii;
      if(nowNum > 567) { break; }
      if(nowNum%10 === 1 && ii > 1) {
          chkItem.push(<hr key={'a'+ii}/>);
      }
      chkItem.push(
        <div key={ii} ref={'checkArea'+ii} className={this.state.count[ii]} onClick={this.handleClick} onKeyPress={this.handleClick} >
          <span style={style}>{nowNum}</span>
          <input type="checkbox" name={'c'+ii+'y'} />
          <input type="checkbox" name={'c'+ii+'n'} />
        </div>
      );
    }
    return(<div>{chkItem}</div>);
  }
}

class Control extends Component {
  constructor(props) {
      super(props);
      this.state = {
        className : '',
        check: false
      }

  }
  handleKeyPress(event) {
    //console.log(event.charCode);
  }
  componentWillMount() {
    this.setState({
      className: 'focus'
    })
    //React.findDOMNode(this.refs.checkArea).focus();
    //this.refs.checkArea.children[0].children[0].children[0].className = 'focus';
    //console.log(this.refs.checkArea.children[0].children[0].children[0].className);
  }

  componentDidMount() {
    this.refs.checkArea.focus();
  }

    render() {
      let style = {
        float: 'left',
        padding:'5px'
      }
      var chkGroup = [];
      for (let i = 0; i < 12; i++) {
        chkGroup.push(
          <div style={style} key={i}>
            <CheckBoxItems num={i} />
          </div>
        );
      }

      return(
          <div>
            <button onClick={this.props.onPlus}>+</button>
            <button onClick={this.props.onSubtract}>-</button>
            <button onClick={this.props.onRadomizeColor}>Randomize Color</button>
            <div ref="checkArea" className={this.state.className} onKeyPress={this.handleKeyPress}>{chkGroup}</div>
          </div>
      );
    }
}

Control.propTypes = propTypes;
Control.defaultProps = defaultProps;

export default Control;

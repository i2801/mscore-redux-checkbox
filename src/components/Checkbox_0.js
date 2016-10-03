import React, { Component, PropTypes } from 'react';

const propTypes = {
  itemArray: React.PropTypes.array
};

const defaultProps = {
  itemArray: [1,2,3]
};


class CheckBoxItems extends Component {
  constructor(props) {
    super(props);
  }
  handleToggle() {
    console.log(123);
    this.props.onEdit();
  }

  handleUp(e) {
      // switch(e.key) {
      //     case "ArrowDown":
      //         this.props.handleFocus(this.props.id+1);
      //     break;
      //     case "ArrowUp":
      //         this.props.handleFocus(this.props.id-1);
      //     break;
      // }

      //this.props.handleFocus(e.key);
      //console.log(1223);
      this.props.onEdit();
  }

  componentDidMount() {
    //console.log(this.props.id);
    this.props.onEdit();
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
        <div key={ii} ref={'checkArea'+ii} onKeyUp={this.handleUp} >
          <span style={style}>{nowNum}</span>
          <input type="checkbox" name={'c'+ii+'y'} onClick={this.handleToggle} />
          <input type="checkbox" name={'c'+ii+'n'} />
        </div>
      );
    }
    return(<div>{chkItem}</div>);
  }
}


CheckBoxItems.defaultProps = {
  contact: {
    name: '',
    phone: ''
  },
  onRemove: () => { console.error('onRemove not defined'); },
  onEdit: () => { console.error('onEdit not defined'); }
}

CheckBoxItems.propTypes = {
  contact: React.PropTypes.object,
  onRemove: React.PropTypes.func,
  onEdit: React.PropTypes.func
}





class Checkbox extends Component {
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
  handleFocus(id) {
      return;
      var child = this.refs['child' + id];
      if (!child) return;
      var input = child.refs.input;
      input.getDOMNode().focus();
  }

  handleKeyUp() {
    console.log(this.props.itemArray);
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
            <CheckBoxItems id={i} num={i} onKeyUp={this.handleKeyUp} handleFocus={this.handleFocus} ref={'child' + i} />
          </div>
        );
      }

      return(
        <div>{chkGroup}</div>
      );
    }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;




export default Checkbox;

import React, { Component } from 'react';

class CheckBoxItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posNum: 1,
    }

    this.handleUp = this.handleUp.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.props.key);
  }

  handleReset(posNum) {
    console.log(this.props.children);
    for (let k=1;k<=50;k++) {
      this.refs['checkArea'+k].className = '';
    }
    this.refs['checkArea'+posNum].className = 'focusDiv';
  }

  handleUp(e) {
    switch(e.key) {
      case "ArrowDown":
        this.state.posNum++;
        this.props.handleFocus(this.props.id, this.state.posNum, 'down');
        e.preventDefault();
        //return false;
        break;
      case "ArrowUp":
        this.state.posNum--;
        this.props.handleFocus(this.props.id, this.state.posNum, 'up');
        e.preventDefault();
        //return false;
        break;
      default:
    }
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
        <div key={ii} ref={'checkArea'+ii} onKeyUp={this.handleUp} onClick={this.handleClick} >
          <span style={style}>{nowNum}</span>
          <input type="checkbox" id={'ck'+ii+'y'} name={'c'+ii+'y'} ref={'c'+ii+'y'} />
          <input type="checkbox" id={'ck'+ii+'n'} name={'c'+ii+'n'} ref={'c'+ii+'n'} />
        </div>
      );
    }
    return(<div>{chkItem}</div>);
  }
}




class CheckboxDiv extends Component {
  constructor(props) {
      super(props);

      this.handleFocus = this.handleFocus.bind(this);

  }

  handleFocus(id, posNum, act) {
      var child = this.refs['child' + id];
      if (!child) return;
      var checkArea = child.refs['checkArea'+posNum];
      var input = child.refs['c'+posNum+'y'];
      var inputN = child.refs['c'+posNum+'n'];
      //console.log(id,posNum,act);
      child.handleReset(posNum); //하위 함수 호출
      //checkArea.className = 'focusDiv';
      checkArea.focus();
      //input.focus();
      //inputN.focus();
  }

  componentWillMount() {
    window.addEventListener("keydown",
    function(e){
        switch(e.keyCode){
            case 37: case 39: case 38:  case 40: // Arrow keys
            case 32: e.preventDefault(); break; // Space
            default: break; // do not block other keys
        }
    },
    false);

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
            <CheckBoxItems id={i} num={i} handleFocus={this.handleFocus} ref={'child' + i} />
          </div>
        );
      }

      return(
        <div>{chkGroup}</div>
      );
    }
}


export default CheckboxDiv;

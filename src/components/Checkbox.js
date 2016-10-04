import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class CheckBoxItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedY: false,
      checkedN: false
    }

    this.handleChecking = this.handleChecking.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.handleClickY = this.handleClickY.bind(this);
    this.handleClickN = this.handleClickN.bind(this);
  }

  handleChecking(key) {
    this.setState({
      checkedY: (key==='1'),
      checkedN: (key==='2')
    })
  }

  handleClickY(e) {
    let obj = e.target;
    this.handleUp();
    obj.focus();
    this.setState({
      checkedY: !this.state.checkedY,
      checkedN: false
    })
  }
  handleClickN(e) {
    let obj = e.target;
    this.handleUp();
    obj.focus();
    this.setState({
      checkedY: false,
      checkedN: !this.state.checkedN
    })
  }

  handleUp() {
    this.props.handleClick(this.props.num);
  }

  render() {
    var style = {
      fontSize:'10px',
      display:'inline-block',
      width:'20px',
      textAlign:'right'
    }
    let nowNum = this.props.nowNum;
    let num = this.props.num;

    return(
      <div ref="checkItem">
        <span style={style} onClick={this.handleUp}>{nowNum}</span>
        <input type="checkbox" name={'c'+num+'y'} ref={'cy'} checked={this.state.checkedY} onClick={this.handleClickY} />
        <input type="checkbox" name={'c'+num+'n'} ref={'cn'} checked={this.state.checkedN} onClick={this.handleClickN} />
      </div>
    );
  }
}


class CheckBoxItems extends Component {
  constructor(props) {
    super(props);

    this.queNum = this.props.queNum;
    this.posNum = 0;
    this.maxDiv = Math.ceil(this.queNum/50);

    this.handleUp = this.handleUp.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(num) {
    this.posNum = num;
    this.props.handleFocus(this.props.id, this.posNum);
  }

  handleReset(posNum) {
    this.posNum = posNum;

    for (let k=1;k<=50;k++) {
      const checkArea = this.refs['checkArea'+k];
      if (checkArea) {
        this.refs['checkArea'+k].refs['checkItem'].className = '';
      }
    }
    if(posNum) {
        this.refs['checkArea'+posNum].refs['checkItem'].className = 'focusDiv';
    }
  }

  handleUp(e = null, act = null) {
    let nextId = 0;
    let key;
    if(e) { key=e.key; }
    if(act) { key=act; }
    switch(key) {
      case "ArrowDown":
        // (현재 커서의 번호가 총 문항 수와 동일하면 더이상 이동 하지 않음.
        if( (this.props.id*50)+this.posNum >= this.queNum ) { if(e) e.preventDefault(); return; }

        if(this.posNum < 50) {
          this.posNum++;
          this.props.handleFocus(this.props.id, this.posNum);
        } else {
          this.props.handleAllReset();
          nextId = this.props.id + 1;
          this.props.handleFocus(nextId, 1);
        }

        // 10번째 또는 0번쨰 항목 일 경우 사운드 플레이
        if( this.posNum%10 === 1 || this.posNum === 0 ) {
          this.props.togglePlay();
        }
        if(e) { e.preventDefault(); }
        //return false;
        break;
      case "ArrowUp":
        // 현재 row 의 0번쨰이며 제일 처음 row 일 시 더이상 이동 하지 않음.
        if( this.props.id === 0 && this.posNum <= 1 ) { if(e) e.preventDefault(); return; }

        if(this.posNum > 1) {
          this.posNum--;
          this.props.handleFocus(this.props.id, this.posNum);
        } else {
          this.props.handleAllReset();
          nextId = this.props.id - 1;
          this.props.handleFocus(nextId, 50);
        }

        // 10번째 또는 50번쨰 항목 일 경우 사운드 플레이
        if( this.posNum%10 === 0 || this.posNum === 50 ) {
          this.props.togglePlay();
        }
        if(e) { e.preventDefault(); }
        //return false;
        break;
      case "ArrowRight":
        // 커서가 마지막 row 바로 이전에 위치 할 시 (현재 커서의 번호+50) 이 마지막 row에 존재하는지 검사하여 이동 여부 결정
        if( ((this.props.id*50)+this.posNum)+50 > this.queNum ) { if(e) e.preventDefault(); return; }
        // 마지막 row 일 시 더이상 이동 하지 않음
        if( this.props.id > this.maxDiv && e ) { e.preventDefault(); return; }

        nextId = this.props.id + 1;
        this.props.handleFocus(nextId, this.posNum);
        if(e) { e.preventDefault(); }
        //return false;
        break;
      case "ArrowLeft":
        if(this.props.id === 0 ) { if(e) e.preventDefault(); return; }

        nextId = this.props.id - 1;
        this.props.handleFocus(nextId, this.posNum);
        if(e) { e.preventDefault(); }
        //return false;
        break;
      case "1": case "2": case "0": case "Backspace":
        this.props.handleChecking(this.props.id, this.posNum, key);

        if(key==="Backspace") {
          this.handleUp(null, "ArrowUp");
        } else {
          this.handleUp(null, "ArrowDown");
        }
        break;
      default:
    }
  }

  componentDidMount() {
    //키보드 입력 시
    this.refs.refChekcboxItem.addEventListener("keydown", this.handleUp);
  }

  render() {
    var nn = this.props.num;
    var num = (nn)*50;
    var chkItem = [];

    for (var ii = 1; ii <= 50; ii++) {
      let nowNum = num+ii;
      if(nowNum > this.queNum) { break; }
      if(nowNum%10 === 1 && ii > 1) {
          chkItem.push(<hr key={'a'+ii}/>);
      }
      chkItem.push(
        <CheckBoxItem key={ii} num={ii} nowNum={nowNum} ref={'checkArea'+ii} handleClick={this.handleClick} />
      );
    }
    //return(<div ref="refChekcboxItem" onKeyDown={this.handleUp}>{chkItem}</div>);
    return(<div ref="refChekcboxItem">{chkItem}</div>);
  }
}




class CheckboxDiv extends Component {

  static propTypes = {
      autoplay: React.PropTypes.bool,
      preload: React.PropTypes.bool,
      source: React.PropTypes.string,
      loop: React.PropTypes.bool,
      onEnded: React.PropTypes.func
  };

  static defaultProps = {
      autoplay: false,
      preload: true,
      source: "http://d3f75ranhl0it0.cloudfront.net/ding.mp3",
      loop: false,
      onEnded: null
  };


  constructor(props) {
      super(props);

      this.queNum = this.props.queNum;
      this.divLength = Math.ceil(this.queNum/50);

      this.handleAllReset = this.handleAllReset.bind(this);
      this.handleChecking = this.handleChecking.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
      this.togglePlay = this.togglePlay.bind(this);
  }

  get audio() {
      if (!this.refs)
          return {};

      return ReactDOM.findDOMNode(this.refs.audio);
  }

  set audio(a) {}

  handleAllReset() {

    for (let n=0; n < this.divLength; n++) {
      var childN = this.refs['child' + n];
      if (childN) {
        childN.handleReset(0);
      }
    }
  }

  handleFocus(id, posNum) {
    let child = this.refs['child' + id];
    if (!child) return;
    let checkArea = child.refs['checkArea'+posNum].refs['cy'];
    this.handleAllReset();
    child.handleReset(posNum); //하위 함수 호출
    checkArea.focus();
  }

  handleChecking(id, posNum, key) {
    if(id===0 && posNum===0) { return; }
    const child = this.refs['child' + id];
    if (!child) return;
    const item = child.refs['checkArea'+posNum];
    item.handleChecking(key);

  }

  togglePlay() {
    if(this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  componentWillMount() {
    window.addEventListener("keydown",
    function(e){
      switch(e.keyCode){
          case 48: case 49: case 50: case 8: // 0,1,2, backspace
          case 37: case 39: case 38:  case 40: // Arrow keys
          case 32: e.preventDefault(); break; // Space
          default: break; // do not block other keys
      }
    },
    false);

  }

  componentDidMount() {
    // 마운트 시 가장 처음 row 의 첫번째 항목에 포커싱
    this.handleFocus(0, 1);
    console.log(this.props.source);
  }

  render() {
    let style = {
      float: 'left',
      padding:'5px'
    }
    let chkGroup = [];
    for (let i = 0; i < this.divLength; i++) {
      chkGroup.push(
        <div style={style} key={i}>
          <CheckBoxItems
            id={i}
            num={i}
            queNum={this.queNum}
            handleFocus={this.handleFocus}
            handleChecking={this.handleChecking}
            handleAllReset={this.handleAllReset}
            togglePlay={this.togglePlay}
            ref={'child' + i}
          />
        </div>
      );
    }

    return(
      <div>
        {chkGroup}
        <audio
            ref="audio"
            preload={this.props.preload}
            controls={false}
            crossOrigin="anonymous"
            autoPlay={this.props.autoplay}
            loop={this.props.loop}
            src={this.props.source} />
      </div>
    );
  }
}

export default CheckboxDiv;

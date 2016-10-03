// import React, { Component } from 'react';
//
// import Counter from './Counter';
//
//
// class App extends Component {
//
//     render() {
//         return(
//             <Counter/>
//         );
//     }
// }
//
// export default App;



import React, { Component } from 'react';

import CheckboxDiv from './Checkbox';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queNum: 478,
    }
  }

  render() {
      return(
          <CheckboxDiv queNum={this.state.queNum}/>
      );
  }
}

export default App;

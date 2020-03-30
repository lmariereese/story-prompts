// import React from 'react';
// import { connect } from 'react-redux';
// import ShareableLink from './ShareableLink';
// import Popup from 'reactjs-popup';
// import {sharePrompt} from '../store/reducers/storyElements';

// class ShareButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false
//     }
//     this.openModal = this.openModal.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//   }

//   openModal() {
//     const {
//       setting,
//       adjective,
//       character,
//       detail,
//       action,
//       climax
//     } = this.props.current;
//     this.props.sharePrompt({
//       setting,
//       adjective,
//       character,
//       detail,
//       action,
//       climax
//     });
//     this.setState({open: true});
//   }

//   closeModal() {
//     this.setState({open: false});
//   }

//   render() {
//     return (
//       <div>
//         <Popup trigger={<button type="button" className="btn">Share</button>} modal>
//           <div>
//             <p>modal content</p>
//             <p>{}</p>
//           </div>
//         </Popup>
//         {/* <button type="button" className="btn" onClick={this.openModal}>Share</button>
//         <Popup open={this.state.open} onClose={this.closeModal} >
//           <ShareableLink current={this.props.current} />
//         </Popup> */}
//       </div>
//     );
//   }
// }

// const mapState = state => ({
//   current: state.elements.current
// });

// const mapDispatch = dispatch => ({
//   sharePrompt: els => dispatch(sharePrompt(els))
// });

// export default connect(mapState, mapDispatch)(ShareButton);

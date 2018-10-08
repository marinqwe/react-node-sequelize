import React from 'react';
import Aux from './Aux';
import Backdrop from './Backdrop';
import '../styles/Modal.css';

class Modal extends React.Component {
    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.closeModal} />
                <div
                    className="Modal"
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}
export default Modal;

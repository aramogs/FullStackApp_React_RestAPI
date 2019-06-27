import React, { Component } from 'react';
//Rendering the diferent errors
class ValidationErrors extends Component {
    render() {

        const { errors } = this.props;
        let valError = 'Something went wrong:';

        if (errors) {
            if (errors.length > 1) {
                valError = 'Something went wrong';
            }
            return (
                <div>
                    <h2 className="validation--errors--label">{valError}</h2>
                    <div className="validation-errors">
                        <ul>
                            {errors.map((msg, i) => {
                                return <li key={i}>- {msg}</li>;
                            })}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default ValidationErrors;
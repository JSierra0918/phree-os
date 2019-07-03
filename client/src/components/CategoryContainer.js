import React, { Component } from 'react';

class CategoryContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: []
        }
    }

    render() {
        return (
            <div>
                <div className="category text-center p-main-col mb20">
                    <h5>Category</h5>

                </div>
            </div>
        );
    }
}

export default CategoryContainer;

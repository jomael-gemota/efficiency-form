import React, { Component } from 'react';

import '../css/banner.css';

class Banner extends Component {
    render() {
        return (
            <div className="banner-wrap">
                <img src="https://cdn.shopify.com/s/files/1/1342/3335/files/OE_Banner.png?v=1593812178" alt="OE Banner" />
            </div>
        );
    };
};

export default Banner;
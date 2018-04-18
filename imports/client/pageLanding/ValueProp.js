import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const myStyle = {
    textAlign: 'center',
}


class ValueProp extends Component {
    
    render() {
    
        return (
            <div className='what-is-pakke'>
                <h2 style={myStyle}> What is Pakke? </h2>
                <div className='value-prop'>


                    <ul className='value-prop-items'>

                        <div className='idea'>
                            <Link className='value-prop-link'to='/events'>
                                <div className='idea-border'>
                                    <div className='glyphicon glyphicon-glass'></div>
                                    <h3>Discover</h3>
                                </div>
                                <p> Pakke’s vision is to focus on the overall experience of how we socialize and more importantly, where and with who. As a guest, this is your opportunity to meet new people, learn about your city, and save money.</p>
                                


                            </Link>
                        </div>

                        <div className='idea'>
                            <Link className='value-prop-link' to='/host'>
                                <div className='idea-border'>
                                    <div className='glyphicon glyphicon-home'></div>
                                    <h3> Connect </h3>
                                </div>
                                <p>
                                    The physical environment is just as important to a day or night out that, if done right, we are willing to open our doors as hosts for curated events. For all hosts, there will be a dedicated experience curator that will provide professional support so your event is successful and profitable.
                                    </p>

                            </Link>
                        </div>

                        <div className='idea'>
                            <Link className='value-prop-link' to='/talent'>
                                <div className='idea-border'>
                                    <div className='glyphicon glyphicon-music'></div>
                                    <h3> Experience </h3>
                                </div>
                                <p> Pakke believes in the power of experiences but finding ways to tap into a unique social outting, we need creative people to guide us there. This is why we pay very close attention to our talented professionals who choose Pakke as a way to bring their art, craft or trade to our communities. Join us today and see how your talent can earn recognition and money.
 </p>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
        )
    }
};


export default ValueProp;


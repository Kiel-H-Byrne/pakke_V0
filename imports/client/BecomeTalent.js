import React from 'react'


const BecomeTalent = () => (
  // <div>
  //   <h1>Share Your Talent</h1>
  //   <h2>Do you have a talent?</h2>
  //   <h3>peform at venues across the city</h3>
  //   <p>Lorem ipsum dolor amet schlitz letterpress gentrify squid migas glossier. Street art tbh vinyl, fingerstache etsy live-edge man braid. Hot chicken kinfolk selvage, forage fam enamel pin dreamcatcher brunch twee franzen. Franzen tumblr mixtape, raw denim +1 you probably haven't heard of them cray brooklyn banjo hexagon. Four dollar toast mustache jianbing yuccie, bespoke 8-bit sartorial post-ironic. Mlkshk yr tumeric brunch pickled pork belly copper mug ennui cold-pressed. Pitchfork sartorial brunch cornhole try-hard.</p>
  // </div>

  <div className="container">
    <h1>Share Your Talent</h1>
    <h2>Do you have a talent?</h2>
    <h3>peform at venues across the city</h3>
    <p>Lorem ipsum dolor amet schlitz letterpress gentrify squid migas glossier</p>

    <button type="button" className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Register Your Talent</button>


    <div className="modal fade" id="myModal" role="dialog">
      <div className="modal-dialog">


        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">&times;</button>
            <h4 className="modal-title">Talent Sign Up Form</h4>
          </div>
          <div className="modal-body">
            <p>Fill out this form to register your talent</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>

  </div>



);

export default BecomeTalent;
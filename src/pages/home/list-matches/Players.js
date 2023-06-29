import React from 'react';
import classnames from 'classnames';

const Players = React.memo(({ show }) => {
    return (
        <div class={classnames("tab-pane fade p-3", {"active in":show})}>
            <div class="part">
                <div class="col-xs-12 pdfix mt-10">
                    <div class="col-xs-4">
                        <img src="img/players/neymar.jpg" alt="" class="rounded img-responsive" />
                        <h4>Neymar</h4>
                        <h5>Forward</h5>
                    </div>
                    <div class="col-xs-4">
                        <img src="img/players/mbappe.jpg" alt="" class="rounded img-responsive" />
                        <h4>Mbappe</h4>
                        <h5>Forward</h5>
                    </div>
                    <div class="col-xs-4">
                        <img src="img/players/cavani.jpg" alt="" class="rounded img-responsive" />
                        <h4>Edison Cavani</h4>
                        <h5>Forward</h5>
                    </div>
                    <div class="col-xs-4">
                        <img src="img/players/buffon.jpg" alt="" class="rounded img-responsive" />
                        <h4>Gianluigi Buffon</h4>
                        <h5>Goalkeeper</h5>
                    </div>
                    <div class="col-xs-4">
                        <img src="img/players/rabiot.jpg" alt="" class="rounded img-responsive" />
                        <h4>Adrien Rabiot</h4>
                        <h5>Midfielder</h5>
                    </div>
                    <div class="col-xs-4">
                        <img src="img/players/dimaria.jpg" alt="" class="rounded img-responsive" />
                        <h4>Angel Di Maria</h4>
                        <h5>Midfielder</h5>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    )
});

export default Players;
import React from 'react';

function userPredictionDetails() {
console.log('hellllooooooo')
    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src={logoGoaly} alt="" height="60" />
            </div>
            <div className="standing" style={{ minWidth: '300px' }}>
                <h1>Yim Darayuth</h1>
                <h2>20/10/20202 03:43:49</h2>
                <table className="table table-striped table-responsive">
                    <tbody>
                        <tr style={{ backgroundColor: '#159B3E', height: '45px' }}>
                            <th style={{ color: '#fff' }}>User Answer</th>
                            <th style={{ color: '#fff' }}>Correct Answer</th>
                            <th style={{ color: '#fff' }}>Point</th>
                        </tr>

                        <tr className="wpos" onClick={() => getWineDetails(true, player.user_id, player.pred_id)} >
                            <td><img src={chelsea} style={{ maxWidth: '25px' }} />1-1<img src={manchester} style={{ maxWidth: '25px' }} /></td>
                            <td><img src={chelsea} style={{ maxWidth: '25px' }} />1-1<img src={manchester} style={{ maxWidth: '25px' }} /></td>
                            <td ><strong> 50</strong> </td>
                        </tr>
                        <tr className="wpos" onClick={() => getWineDetails(true, player.user_id, player.pred_id)} >
                            <td><img src={chelsea} style={{ maxWidth: '25px' }} />(1)</td>
                            <td><img src={manchester} style={{ maxWidth: '25px' }} />(2)</td>
                            <td ><strong>0</strong> </td>
                        </tr>
                        <tr className="wpos" onClick={() => getWineDetails(true, player.user_id, player.pred_id)} >
                            <td><img src={chelsea} style={{ maxWidth: '25px' }} />(1)</td>
                            <td><img src={manchester} style={{ maxWidth: '25px' }} />(2)</td>
                            <td ><strong>0</strong> </td>
                        </tr>
                        <tr className="wpos" onClick={() => getWineDetails(true, player.user_id, player.pred_id)} >
                            <td><img src={chelsea} style={{ maxWidth: '25px' }} />(1)</td>
                            <td><img src={manchester} style={{ maxWidth: '25px' }} />(2)</td>
                            <td ><strong>0</strong> </td>
                        </tr>

                    </tbody>
                </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="button" className="btn-reg">
                    <strong style={{ paddingRight: '170px' }}>Total Points</strong><strong>50</strong>
                </button>
            </div>
        </React.Fragment>

    )
}
export default userPredictionDetails;
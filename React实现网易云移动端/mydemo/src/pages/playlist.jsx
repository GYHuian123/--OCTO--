import React from "react";
import '../assets/css/playlist.css'
class Playlist extends React.Component {
    componentDidMount() {
        console.log(this, "this");
    }
    render() {
        return (
            <div className='playlist'>
                <button className='btn' onClick={() => { this.props.history.go(-1) }}>返回</button>
                <h1>推荐歌单详情页</h1>
                <h1>接收到使用动态路由接受的参数是---{this.props.match.params.id}</h1>
            </div>
        );
    }
}
export default Playlist;

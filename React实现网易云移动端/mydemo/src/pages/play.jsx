import React from 'react'
import '../assets/css/play.css'
import { getsongDetail, getLyric, getsongUrl } from '../util/axios'
class Play extends React.Component {
    constructor() {
        super()
        this.state = {
            songdetail: {},
            name: '',
            arname: '',
            lyric: '',
            songurl: ''
        }
    }
    componentDidMount() {
        //调用歌曲详情接口
        getsongDetail({ ids: this.props.location.state.id }).then(res => {
            console.log(res, '歌单详情');
            if (res.code === 200) {
                this.setState({
                    songdetail: res.songs[0],
                    name: res.songs[0].name,
                    arname: res.songs[0].ar[0].name
                })
            }
        })
        //调用歌词接口
        getLyric({ id: this.props.location.state.id }).then(res => {
            console.log(res, '歌词');
            if (res.code === 200) {
                this.setState({
                    lyric: res.lrc.lyric,
                })
            }
        })
        //调用音乐url接口
        getsongUrl({ id: this.props.location.state.id }).then(res => {
            console.log(res, '音乐url');
            if (res.code === 200) {
                this.setState({
                    songurl: res.data[0].url,
                })
            }
        })
    }
    render() {
        const { songdetail, name, arname, lyric, songurl } = this.state
        return (<div className='play'>
            <button className='btn' onClick={() => { this.props.history.go(-1) }}>返回</button>
            <div className='song-disc'>
                <img src={songdetail.al ? songdetail.al.picUrl : ''} alt="" />
            </div>
            <h2 className='song-h2'>
                <span>{name}</span>
                <span className='gap'>-</span>
                <b className='autr'>{arname}</b>
            </h2>
            <p className='song-lrori'>{lyric}</p>
            <audio className='music' src={songurl} controls autoPlay></audio>
        </div>)
    }
}
export default Play
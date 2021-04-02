import React from 'react'
import '../assets/css/rank.css'
import { gethotSong } from '../util/axios'
class Rank extends React.Component {
    constructor() {
        super()
        this.state = {
            hotlist: [],
            time: null
        }
    }
    componentDidMount() {
        //页面一加载调取热歌榜接口
        gethotSong().then(res => {
            console.log(res, '热歌榜列表');
            if (res.code === 200) {
                this.setState({
                    hotlist: res.playlist.tracks.filter((item, idx) => idx < 20),
                    time: res.playlist.updateTime
                }, () => {
                    console.log(this.state.hotlist);
                    console.log(this.state.time);
                })
            }
        })
    }
    //封装一个跳转到播放音乐页面
    goplay(id) {
        this.props.history.push({
            pathname: '/play',
            state: { id }
        })
    }
    render() {
        const { hotlist, time } = this.state
        let date = new Date(time)
        let month = date.getMonth() + 1
        let day = date.getDate()
        return (<div className='hot'>
            {/* 热歌头部 */}
            <div className='hottop'>
                <div className='hotopct'>
                    <div className='hoticon'></div>
                    <div className='hottime'>更新日期：{month < 10 ? "0" + month + '月' : month + '月'}{day < 10 ? '0' + day + '日' : day + '日'}</div>
                </div>
            </div>
            {/* 热歌列表 */}
            <div className='hotcont'>
                {hotlist.map((item, idx) => {
                    return (<div className='hotitem' key={idx} onClick={this.goplay.bind(this, item.id)}>
                        <div className={idx <= 2 ? 'left' : 'lefts'}>{idx < 9 ? '0' + (idx + 1) : idx + 1}</div>
                        <div className='right'>
                            <div className='chleft'>
                                <p className='title'>{item.name}</p>
                                <p className='info'>
                                    <i></i>
                                    {item.ar[0].name} - {item.al.name}
                                </p>
                            </div>
                            <div className='chright'>
                                <span></span>
                            </div>
                        </div>
                    </div>)
                })}

            </div>
        </div>)
    }
}
export default Rank
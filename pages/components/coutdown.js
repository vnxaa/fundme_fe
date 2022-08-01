import React from 'react';

class Countdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
    }
    componentWillMount() {
        this.getTime(this.props.deadline);
    }
    componentDidMount() {
        setInterval(() => this.getTime(this.props.deadline, 1000));
    }

    getTime() {
        const time = Date.parse(this.props.deadline) - Date.parse(new Date());
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor((time / 1000 / 60) % 60);
        const hours = Math.floor((time / 1000 / 60 / 60) % 24);
        const days = Math.floor((time / 1000 / 60 / 60 / 24));
        this.setState({ days, hours, minutes, seconds });
    }

    render() {
        return (
            <div>
                {
                    (this.state.seconds < 0) ?
                        <div>
                            Campaign End
                        </div> :
                        <div className='text-white flex pt-6'>
                            <div className="days"><pre>{this.state.days} Days : </pre></div>
                            <div className="hours"><pre>{this.state.hours} Hours : </pre></div>
                            <div className="minutes"><pre>{this.state.minutes} Minutes : </pre></div>
                            <div className="seconds"><pre>{this.state.seconds} Seconds </pre></div>
                        </div>
                }
            </div>
        );
    }
}
export default Countdown;



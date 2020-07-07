import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

import TimeField from 'react-simple-timefield';

import '../css/content.css';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            limit: 9,
            submit: '',
            next: '',
            back: '',
            qty0: '', qty1: '', qty2: '', qty3: '', qty4: '', qty5: '', qty6: '', qty7: '', qty8: '', qty9: '',
            time0: '00:00', time1: '00:00', time2: '00:00', time3: '00:00', time4: '00:00', time5: '00:00', time6: '00:00', time7: '00:00', time8: '00:00', time9: '00:00',
            notif: '',
            taskDate: ''
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickBack = this.onClickBack.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.onResetQtyTimeStates = this.onResetQtyTimeStates.bind(this);
    };

    componentDidMount() {
        this.setState({
            next: <button className="btn-next" onClick={() => this.onClickNext()}>Next</button>
        });
    };

    onChangeInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    onClickBack() {
        const { page } = this.state;
        
        if (page === 1) {
            this.setState({ back: '' });
        };

        this.setState(prevState => {
            if (prevState.page <= 0) {
                return {
                    page: prevState.page
                };
            };

            return {
                page: prevState.page - 1,
                notif: '',
                submit: '',
                next: <button className="btn-next" onClick={() => this.onClickNext()}>Next</button>
            };
        });
    };

    onClickNext() {
        const { page, limit } = this.state;
        let x = 'qty' + page, y = 'time' + page;

        x = this.state[x]; y = this.state[y];

        if ((x !== '' && y !== '00:00') || (x === '' && y === '00:00')) {
            this.setState(prevState => {
                if (prevState.page >= limit) {
                    return {
                        page: prevState.page
                    };
                };

                return {
                    page: prevState.page + 1,
                    notif: '',
                    back: <button className="btn-back" onClick={() => this.onClickBack()}>Back</button>
                };
            });
    
            if (page === (limit - 1)) {
                this.setState({
                    submit: <button type="submit" className="btn-submit" onClick={() => this.onClickSubmit()}>Submit</button>,
                    next: ''
                })
            };
        } else {
            this.setState({ notif: <p className="notif">Please complete the required fields</p> });
        };
    };

    onClickSubmit() {
        const { qty0, qty1, qty2, qty3, qty4, qty5, qty6, qty7, qty8, qty9,
            time0, time1, time2, time3, time4, time5, time6, time7, time8, time9,
            taskDate, limit
        } = this.state;

        let qty = 0;
        let time = '';

        for (let i = 0; i <= limit; i++) {
            let x = 'qty' + i;
            let y = 'time' + i;
            qty += this.state[x];
            time += this.state[y];
        };

        if (qty > 0 && taskDate !== '' && time !== '00:0000:0000:0000:0000:0000:0000:0000:0000:0000:00') {
            const data = {
                employeeName: 'Gemota, Jomael',
                warehouseLocation: 'NC',
                submittedDate: moment().format("YYYY-MM-DD"),
                taskDate: moment(taskDate).format("YYYY-MM-DD"),
                processPrimeQty: qty0,
                processPrimeTime: time0,
                processRapidQty: qty1,
                processRapidTime: time1,
                addInventoryQty: qty2,
                addInventoryTime: time2,
                bulkCasesProcessedQty: qty3,
                bulkCasesProcessedTime: time3,
                bulkCasesLabeledQty: qty4,
                bulkCasesLabeledTime: time4,
                itemsLabeledQty: qty5,
                itemsLabeledTime: time5,
                processedRemovalQty: qty6,
                processedRemovalTime: time6,
                processReturnsQty: qty7,
                processReturnsTime: time7,
                auditLocationsQty: qty8,
                auditLocationsTime: time8,
                processOnsiteQty: qty9,
                processOnsiteTime: time9
            };
    
            axios.post('/api/form/insertFormResponse', data)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
            
            this.setState({
                notif: <p className="notif-success">Task(s) was successfully submitted!</p>,
                page: 0,
                taskDate: '',
                back: '',
                next: <button className="btn-next" onClick={() => this.onClickNext()}>Next</button>,
                submit: ''
            });
            this.onResetQtyTimeStates();
        } else {
            if (taskDate === '') {
                this.setState({ notif: <p className="notif">Missing Task Date</p> });
            } else {
                this.setState({ notif: <p className="notif">No task(s) to be submitted</p> });
            };
        };
    };

    onResetQtyTimeStates() {
        this.setState({
            qty0: '', qty1: '', qty2: '', qty3: '', qty4: '', qty5: '', qty6: '', qty7: '', qty8: '', qty9: '',
            time0: '00:00', time1: '00:00', time2: '00:00', time3: '00:00', time4: '00:00', time5: '00:00', time6: '00:00', time7: '00:00', time8: '00:00', time9: '00:00',
        });
    };

    on

    render() {
        const { page, back, submit, next, notif, taskDate } = this.state;
        const { qty0, qty1, qty2, qty3, qty4, qty5, qty6, qty7, qty8, qty9,
                time0, time1, time2, time3, time4, time5, time6, time7, time8, time9
        } = this.state;
        const { onChangeInput } = this;

        const data = [
            {
                title: 'Process Prime',
                qty: <input type="number" name="qty0" value={qty0} placeholder="Your answer" onChange={(event) => onChangeInput(event)} />,
                time: <TimeField name="time0" value={time0} onChange={(event) => onChangeInput(event)} />
            },
            {
                title: 'Process Rapid',
                qty: <input type="number" name="qty1" value={qty1} placeholder="Your answer" onChange={(event) => onChangeInput(event)} />,
                time: <TimeField name="time1" value={time1} onChange={(event) => onChangeInput(event)} />
            },
            {
                title: 'Add Inventory',
                qty: <input type="number" name="qty2" value={qty2} placeholder="Your answer" onChange={(event) => onChangeInput(event)} />,
                time: <TimeField name="time2" value={time2} onChange={(event) => onChangeInput(event)} />
            },
            {
                title: 'Bulk Cases Processed',
                qty: <input type="number" name="qty3" value={qty3} placeholder="Your answer" onChange={(event) => onChangeInput(event)} />,
                time: <TimeField name="time3" value={time3} onChange={(event) => onChangeInput(event)} />
            },
            {
                title: 'Bulk Cases Labeled',
                qty: <input type="number" name="qty4" value={qty4} placeholder="Your answer" onChange={(event) => onChangeInput(event)} />,
                time: <TimeField name="time4" value={time4} onChange={(event) => onChangeInput(event)} />
            },
            {
                title: 'Items Labeled',
                qty: <input type="number" name="qty5" value={qty5} placeholder="Your answer" onChange={(event) => onChangeInput(event)} />,
                time: <TimeField name="time5" value={time5} onChange={(event) => onChangeInput(event)} />
            },
            {
                title: 'Processed Removal',
                qty: <input type="number" name="qty6" value={qty6} placeholder="Your answer" onChange={(event) => onChangeInput(event)} />,
                time: <TimeField name="time6" value={time6} onChange={(event) => onChangeInput(event)} />
            },
            {
                title: 'Process Returns',
                qty: <input type="number" name="qty7" value={qty7} placeholder="Your answer" onChange={(event) => onChangeInput(event)} />,
                time: <TimeField name="time7" value={time7} onChange={(event) => onChangeInput(event)} />
            },
            {
                title: 'Audit Locations',
                qty: <input type="number" name="qty8" value={qty8} placeholder="Your answer" onChange={(event) => onChangeInput(event)} />,
                time: <TimeField name="time8" value={time8} onChange={(event) => onChangeInput(event)} />
            },
            {
                title: 'Process OnSite',
                qty: <input type="number" name="qty9" value={qty9} placeholder="Your answer" onChange={(event) => onChangeInput(event)} />,
                time: <TimeField name="time9" value={time9} onChange={(event) => onChangeInput(event)} />
            },
        ];

        return (
            <div className="content">
                <div className="qty-wrap">
                    <div className="top-box">
                        <p>{ data.slice(page)[0].title }</p>
                    </div>
                    <input type="date" name="taskDate" className="task-date" value={taskDate} onChange={(event) => onChangeInput(event)} />
                    <p className="qty-title">Quantity</p>
                    <p className="qty-input">{ data.slice(page)[0].qty }</p>
                </div>
                <div className="time-wrap">
                    <p className="time-title">Duration</p>
                    <p className="time-input">{ data.slice(page)[0].time }</p>
                </div>
                <div className="btns">
                    { back }
                    { next }
                    { submit }
                </div>
                { notif }
            </div>
        );
    };
};

export default Content;
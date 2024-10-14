import React, { useState } from 'react';
import moment from 'moment';
import Modal from './modal';

const MeetingDetail = ({ openMeeting, eventDetail, openMeetingChange }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [hoveredEventId, setHoveredEventId] = useState(null);
    const [meetInfo, setMeetInfo] = useState()
    
    const handleMouseEnter = (id) => {
        setHoveredEventId(id);
    };

    const handleMouseLeave = () => {
        setHoveredEventId(null);
    };

    const handleCloseMeeting = () => {
     openMeetingChange()
    }

    const handleOpenGoogleMeet = (item) => {
        setModalOpen(true)
        setMeetInfo(item)
        openMeetingChange(false)
    }
    const ColoredLine = () => (
        <br/>
    );
    
    return (
        <div>
            {openMeeting && (
                <>
                    <div className="modal">
                        <div className="modal-content">
                            <div className='header-content'>
                            <p>Meetings</p>
                            <span className="close-icon" onClick={handleCloseMeeting}>&times;</span>
                            </div>
                            {openMeeting && eventDetail.map(item => {
                                const isHovered = hoveredEventId === item.id;
                                const divClass = isHovered
                                  ? 'meeting-events-detail hovered'
                                  : 'meeting-events-detail';
                                return (
                                    <div className={divClass} key={item.id} onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={handleMouseLeave} onClick={() => handleOpenGoogleMeet(item)}>
                                        <div style={{ display: 'flex', gap: '35%'}}>
                                            <span>{item.user_det.job_id.jobRequest_Title}</span>
                                            {/* <div style={{ display: 'flex', gap: '10px'}}>
                                                <img className='download-icon' src={`/images/edit.png`}></img>
                                                <img className='download-icon' src={`/images/delete.png`}></img>
                                            </div> */}
                                        </div>
                                        <span>{item.summary} | Interviewer: {item.user_det.handled_by.firstName}</span>
                                        <span className='date-time'>Date: { moment(item.start).format('DD MMM YYYY') } | Time: { moment(item.start).format('hh:mm A') } - {moment(item.end).format('hh:mm A') }</span>
                                        <ColoredLine />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            )}
            {modalOpen && (
                <Modal onClose={() => setModalOpen(false)}>
                    {meetInfo && (
                        <div className='event-detail-info'>
                            <div className='event-container-detail'>
                                <div>
                                <ul className='list-detail'>
                                    <li>
                                    Interviewer With: { meetInfo.user_det.handled_by.firstName }
                                    </li>
                                    <li>
                                    Position: { meetInfo.job_id.jobRequest_Title }
                                    </li>
                                    <li>
                                    Created By: { meetInfo.user_det.handled_by.firstName }
                                    </li>
                                    <li>
                                    Interview Date: { moment(meetInfo.start).format('DD MMM YYYY') }
                                    </li>
                                    <li>
                                    Interview Time: { moment(meetInfo.start).format('hh:mm A') }
                                    </li>
                                    <li>
                                    Interview Via: Google Meet
                                    </li>
                                </ul>
                                <div className='event-btn-download'>
                                    <a className='event-download-btn' href={meetInfo.link} 
                                        target="_blank" rel="noopener noreferrer">
                                        <span>Resume.docx </span>
                                        <img className='download-icon' src={`/images/download.png`}></img>
                                        <img className='download-icon' src={`/images/view.png`}></img>
                                    </a>
                                    <a className='event-download-btn' href={meetInfo.link} 
                                        target="_blank" rel="noopener noreferrer">
                                        <span>Aadhar Card </span>
                                        <img className='download-icon' src={`/images/download.png`}></img>
                                        <img className='download-icon' src={`/images/view.png`}></img>
                                    </a>
                                </div>
                                </div>
                                <div className='divider'></div>
                                <div className='google-meet-container'>
                                    <img src={`/images/logo-meet.png`}></img>
                                    <a className='google-meet-btn' href={meetInfo.link} 
                                        target="_blank" rel="noopener noreferrer">
                                        <span>JOIN</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            )}
        </div>
        
    )
};

export default MeetingDetail;

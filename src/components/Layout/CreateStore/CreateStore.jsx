import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './create.module.css';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import img1 from '../../Assets/img1.png';
import img2 from '../../Assets/img2.png';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
import homeStyles from '../Homepage/Homepage.module.css';
import img3 from '../../Assets/img3.png';
import TimerIcon from '@mui/icons-material/Timer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import { addStoreDetails, checkStore } from '../../../redux/actions/LayoutAction';
import { setLoader, UnsetLoader } from '../../../redux/actions/LoaderActions';
import { message } from 'antd';
import axios from 'axios';

const CreateStore = () => {
  let navigate = useNavigate();
  const [strName, setStrName] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [ctr, setCtr] = useState(0);
  const [billTime, setBillTime] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [about, setAbout] = useState('');
  const [loc, setLoc] = useState({
    lat: 0,
    long: 0
  });
  const [storeDetails, setStoreDetails] = useState([]);

  let dispatch = useDispatch();

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  function showPosition(position) {
    setLoc({ lat: position.coords.latitude, long: position.coords.longitude });
  }

  const funSub = () => {
    const eventData = {
      name: strName,
      start_time: new Date(from).toISOString(),
      end_time: new Date(to).toISOString(),
      description: about,
      created_by: creatorName,
      length_of_queue: ctr,
      event_duration: billTime
    };
  
    dispatch(setLoader());
    axios.post("http://127.0.0.1:8000/create_event/", eventData)
      .then(() => {
        dispatch(UnsetLoader());
        message.success('Event Created!');
      })
      .catch(() => {
        message.error('Failed to create event.');
        dispatch(UnsetLoader());
      });
  };
  

  useEffect(() => {
    dispatch(setLoader());
    dispatch(checkStore())
      .then((res) => {
        dispatch(UnsetLoader());
        setStoreDetails(res.data);
        setStrName(res.data.name);
        setCreatorName(res.data.created_by);
        setAbout(res.data.description);
        setCtr(res.data.length_of_queue);
        setLoc({
          lat: res.data.latitude,
          long: res.data.longitude
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch(UnsetLoader());
        setStoreDetails([]);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <div className={styles.box}>
          <h1>Edit Store Details</h1>
          <br />
          <StoreMallDirectoryIcon style={{ position: 'relative', top: '10px' }} fontSize="large" />
          <input placeholder="Event Name" value={strName} onChange={(e) => { setStrName(e.target.value) }}></input>
          <br />
          <img src={img1} alt="counters" style={{ width: '7%', position: 'relative', top: '10px' }}></img>
          <input placeholder="Creator Name" value={creatorName} onChange={(e) => { setCreatorName(e.target.value) }}></input>
          <br />
          <img src={img2} alt="counters" style={{ width: '7%', position: 'relative', top: '10px' }}></img>
          <input placeholder="Expected Number of Participants" value={ctr} onChange={(e) => { setCtr(e.target.value) }}></input>
          <br />
          <TimerIcon style={{ position: 'relative', color: '#192839', fontSize: '38px', display: 'inline-block', top: '6px' }} />
          <input placeholder="Billing Time" value={billTime} onChange={(e) => { setBillTime(e.target.value) }}></input>
          <p style={{ fontSize: '14px', marginLeft: '10px', position: 'relative', top: '-15px', color: 'gray' }}>Waiting time will be calculated automatically.</p>
          {/* <LocationOnIcon style={{ position: 'relative', top: '10px' }} fontSize="large" />
          <button className={styles.coord} onClick={getLocation}>Get coordinates</button>
          <p>{loc.lat},{loc.long}</p> */}
          <br />
          <AccessTimeIcon style={{ position: 'relative', top: '10px' }} fontSize="large" />
          <input type="datetime-local" placeholder="From" style={{ width: '39%' }} value={from} onChange={e => setFrom(e.target.value)} ></input>
          <input type="datetime-local" placeholder="To" style={{ width: '39%' }} value={to} onChange={(e) => { setTo(e.target.value) }}></input>
          <br />
          <InfoIcon style={{ position: 'relative', top: '-30px' }} fontSize="large" />
          <textarea placeholder="About" value={about} onChange={(e) => { setAbout(e.target.value) }}></textarea>
          <button className={homeStyles.enterButton} style={{ width: '50%', marginLeft: '15%', marginTop: '10px' }} onClick={() => funSub()}>
            {storeDetails.name ? 'Update' : 'Create'}
          </button>
          <button className={homeStyles.enterButton} style={{ width: '50%', marginLeft: '15%', marginTop: '10px' }} onClick={() => navigate('/view-queue/id')}>
            View queue
          </button>
          <button className={homeStyles.enterButton} style={{ width: '50%', marginLeft: '15%', marginTop: '10px' }} onClick={() => navigate('/chart')}>
            View Store Analytics
          </button>
        </div>
        <div className={styles.box}>
          <h1>Store Preview</h1>
          <div className={styles.mobile}>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td className={styles.left}>
                    <h1 className={homeStyles.mainHead} style={{ margin: '0' }}>{strName !== '' ? strName : 'Store Name'}</h1>
                    <table>
                      <tbody>
                        <tr>
                          <td style={{ padding: '10px' }}>
                            <div>
                              <img src={img1} alt="counters" className={homeStyles.icons} /><div className={homeStyles.roundNo}>{ctr ? ctr : '0'}</div>
                              <div style={{ textAlign: 'center', width: '100%' }}>Counters</div>
                            </div>
                          </td>
                          <td style={{ padding: '10px' }}>
                            <div>
                              <TimerIcon style={{ position: 'relative', color: '#192839', fontSize: '38px', display: 'inline-block', top: '6px' }} /><span className={homeStyles.yellowCapsule} style={{ margin: '0', position: 'relative', bottom: '6px', padding: '2px 5px' }}>
                                Xhr XXmin XXXsec
                            </span>
                              <div style={{ textAlign: 'center', width: '100%' }}>Waiting time</div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '10px' }}>
                            <div>
                              <img src={img2} alt="counters" className={homeStyles.icons} /><div className={homeStyles.roundNo}>{ctr ? ctr : 'x'}</div>
                              <div style={{ textAlign: 'center', width: '100%' }}>Customers</div>
                            </div>
                          </td>
                          <td style={{ padding: '10px' }}>
                            <div>
                              <img src={img3} alt="counters" className={homeStyles.icons} /><span className={homeStyles.yellowCapsule} style={{ margin: '0', position: 'relative', bottom: '10px', padding: '2px 5px' }}>
                                {billTime ? billTime : '0'} min
                            </span>
                              <div style={{ textAlign: 'center', width: '100%' }}>Billing time</div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <AccessTimeIcon fontSize='large' style={{ position: 'relative', top: '10px' }} /> Open From :{from ? from : '9'}, To :{to ? to : '6'}
                    <br />
                    <div>
                      <h1>Address</h1>
                      <p style={{ width: '90%' }}>{about ? about : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur feugiat ex sed gravida. Proin eu orci varius, dictum erat ac, ullamcorper arcu. Aliquam erat volutpat.Nam sagittis leo ut nibh vehicula, in venenatis velit laoreet. '}</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <button className={homeStyles.enterButton} style={{ width: '40%', marginLeft: '30%', marginTop: '10px' }} onClick={() => navigate('/')}>
              Join Queue
            </button>
            <p style={{ textAlign: 'center', fontSize: '14px' }}>Ensure to be physically near the store.</p>
          </div>
          <button className={homeStyles.enterButton} style={{ width: '50%', marginLeft: '15%', marginTop: '10px', backgroundColor: '#FF8898', boxShadow: '0px 4px 15px #FF8898', borderColor: '#FF8898' }}>
            Close Store
          </button>
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export default CreateStore;

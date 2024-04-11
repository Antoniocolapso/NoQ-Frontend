import React, { useState, useEffect } from 'react';
import './View.css';
import Navbar from '../../Layout/Navbar/Navbar';

const View = () => {
  const [counters, setCounters] = useState([]);
  const [slots, setSlots] = useState({});
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalSlots, setTotalSlots] = useState(0);
  const [slotsBooked, setSlotsBooked] = useState(0);
  const [waitingTime, setWaitingTime] = useState('00:00'); // Assuming waiting time is in HH:MM format
  const [isLoading, setIsLoading] = useState(true); // State for loader screen

  // Dummy data for counters and slots
  useEffect(() => {
    const dummyCounters = [
      { id: 1, name: 'Counter 1' },
      { id: 2, name: 'Counter 2' },
      { id: 3, name: 'Counter 3' },
      { id: 4, name: 'Counter 4' },
      { id: 5, name: 'Counter 5' },
    ];
    setCounters(dummyCounters);

    const dummySlots = {};
    let totalSlotsCount = 0;
    let bookedSlotsCount = 0;
    dummyCounters.forEach((counter) => {
      const counterSlots = [];
      for (let i = 1; i <= 5; i++) {
        const randomStatus = Math.random() < 0.5 ? 'booked' : 'available';
        counterSlots.push({ id: i, time: `0${i}:00 AM`, status: randomStatus });
        totalSlotsCount++;
        if (randomStatus === 'booked') {
          bookedSlotsCount++;
        }
      }
      dummySlots[counter.name] = counterSlots;
    });
    setSlots(dummySlots);
    setTotalSlots(totalSlotsCount);
    setSlotsBooked(bookedSlotsCount);
    setIsLoading(false); // Hide loader screen

    // Dummy values for total participants and waiting time
    setTotalParticipants(150);
    setWaitingTime('01:30');
  }, []);

  const handleSlotClick = (slot) => {
    if (slot.status === 'available') {
      // Implement booking functionality here
      console.log(`Slot ${slot.id} at ${slot.time} booked!`);
      // You can update the slot status to 'booked' and perform any additional actions here
    }
  };

  return (
    <>
      {isLoading ? ( // Loader screen
        <div>Loading...</div>
      ) : (
        <div className='main-div'>
          <div className='Signup-Page'>
            <div className='Navbar-Signup'>
              <Navbar />
            </div>

            {/* Top bar showing counter information */}
            <div className='top-bar'>
              <p>Total Participants: {totalParticipants}</p>
              <p>Total Slots: {totalSlots}</p>
              <p>Slots Booked: {slotsBooked}</p>
              <p>Waiting Time: {waitingTime}</p>
            </div>

            {/* Main content area with two sections */}
            <div className='main-content'>
              {/* Left section showing all counters */}
              <div className='counters-section'>
                {counters.map((counter) => (
                  <div key={counter.id} className='counter-card'>
                    <h2>{counter.name}</h2>
                    <div className='slots-scrollable'>
                      <div className='slots-grid'>
                        {slots[counter.name].map((slot) => (
                          <div
                            key={slot.id}
                            className={`slot ${slot.status === 'booked' ? 'booked' : 'available'}`}
                            onClick={() => handleSlotClick(slot)}
                          >
                            <p>{slot.time}</p>
                            <p>{slot.status === 'booked' ? 'Booked' : 'Available'}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default View;

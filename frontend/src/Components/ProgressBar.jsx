import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import io from "socket.io-client";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import EastIcon from '@mui/icons-material/East';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HomeIcon from '@mui/icons-material/Home';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Details from './Details';
const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
      1: <DoneAllIcon />,
      2: <AirportShuttleIcon/>,
    3: <EastIcon />,
    4: <HomeIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Order Placed','Order Picked Up', 'Order On The Way', 'Delivered'];

export default function CustomizedSteppers({productId}) {
    function time(str) {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const hours = today.getHours();
        console.log("time: ", time);
        setPickUpTime(time)
        if (str == "delivered") {
            setHours(time)
        } else {
            setHours(hours)
        }
    }
    const [completedStep, setCompletedStep] = useState(-1);
    const [pickUpTime, setPickUpTime] = useState(0);
    const [hours, setHours] = useState()
    const socket = io.connect("http://localhost:4000");
    //setInterval(time, 1000);
    useEffect( () => {
         socket.on("tracker", (payload) => {
            if (payload.message === "placed") {
                setCompletedStep(completedStep + 1);
                time();
            }else if (payload.message === "pickedUp") {
                setCompletedStep(completedStep + 1);
                time()
            }
            else if (payload.message === "ontheway") {
                setCompletedStep(completedStep + 1);
            }else if (payload.message === "delivered" ) {
                setCompletedStep(completedStep + 1);
                time("delivered")
            }
        });
    }, [completedStep]);
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={completedStep} connector={<ColorlibConnector />} sx={{color:"white"}}>
              {steps.map((label) => {
                  
                 return  <Step key={label} sx={{ color: "white" }}>
                      
                     {label == "Order Picked Up" ? <StepLabel StepIconComponent={ColorlibStepIcon} style={{ color: "orange" }}> <h3 >{label}</h3> <h5 >{`${completedStep == 0 ? "Expected time: " + pickUpTime : completedStep == 0 ? pickUpTime: ""}`}</h5>  </StepLabel>
                         : label == "Delivered" ? <StepLabel StepIconComponent={ColorlibStepIcon} style={{ color: "orange" }}> <h3 >{label}</h3> <h5 style={{color:"white"}}>{`${completedStep===3?pickUpTime: hours + 1}`}</h5> </StepLabel> : <StepLabel StepIconComponent={ColorlibStepIcon} style={{ color: "orange" }}> <h3 >{label}</h3> </StepLabel>}
                      
                  </Step>
              })}
          </Stepper>
          <Details productId={productId}/>
    </Stack>
  );
}

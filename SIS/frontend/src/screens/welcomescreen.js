import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Import CSS file for background image

function Welcomescreen() {
  const navigate = useNavigate();

  const GoToAdmin = () => {
    navigate("/adminlogin"); 
  }

  const GoToStudent = () => {
    navigate("/studentlogin");
  }

  return (
    <>
      <div className="background-image"> {/* Apply the background image class */}
        <Card className="text-center" style={{ margin: "0 20% 10% 20%", color: "blue", background: "none", border: "none" }}>
          <Card className="text-center" style={{ margin: "20% 8% 8% 40%", width: "80%", background: "none", border: "none" }}>
            <Card.Body style={{ margin: "5% 35% 3% 35%" }}>
              <Card.Title style={{ margin: "0 0 20% -220%", fontSize: "2em", width: "1000px", fontFamily:"cursive" }}>Student Information System</Card.Title>
              <Button onClick={GoToAdmin} className="animated-button">Admin</Button> <br /> <br/>
              <Button onClick={GoToStudent} className="animated-button">Student</Button>
            </Card.Body>
          </Card>
        </Card>
      </div>
    </>
  )
}

export default Welcomescreen;

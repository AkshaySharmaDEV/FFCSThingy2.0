import React from 'react';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, NavbarBrand, Modal, Button } from 'react-bootstrap';
import {FaBars} from 'react-icons/fa';

import "whatwg-fetch";
import '../App.css';
import '../css/nav-bar.css'

import navbarImage from '../images/logo.1.png';


class CustomNavbar extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			show: false
		};
	}

	handleClose = () => {
		this.setState({
			show: false,
			value: ''
		});
	}

	handleShow = () => {
		if(this.state.show===false)
			this.setState({ show: true });
		else
			this.setState({ show: false });
	}

	renderThemeChoices = () => {
		return Object.keys(this.props.themes).map(v => {
			return (
				<NavDropdown.Item eventKey={v} key={v}>{this.props.themes[v].name}
					<NavDropdown.Divider />
				</NavDropdown.Item>
			)
		})
	}

	renderCurriculumChoices = () => {
		return this.props.curriculumList.map(v => <NavDropdown.Item eventKey={v}>{v}
				<NavDropdown.Divider />
			</NavDropdown.Item>);
	}

	renderModal = () => {
		return (
			<Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
		centered
		show={this.state.show}
		onHide={this.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sync with VTOP
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
			Add an extension to your browser and sync with VTOP!
          </p>
		  <a href='https://chrome.google.com/webstore/detail/ffcsooo/mepdkhhjialfmbggojniffnjidbdhpmh' target="_blank" rel="noopener noreferrer">Chrome Extension</a>
		  <br />
		  <a href='https://chrome.google.com/webstore/detail/ffcsooo/mepdkhhjialfmbggojniffnjidbdhpmh' target="_blank" rel="noopener noreferrer">Firefox Extension</a>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
		);
	}

	render() {
		return (
			<Navbar className="navBar" bg="light" fixed="top" expand="md">

				<NavbarBrand className="navbar-left">
					<img className="logo" alt="" src={navbarImage}></img>
					<span className="branding">FFCSThingy</span>
				</NavbarBrand>

				<NavDropdown
					title={this.props.selectedCurriculum}
					className="navDropContainerCurriculum"
					onSelect={this.props.handleCurriculumChange}
				>
					{this.renderCurriculumChoices()}
				</NavDropdown>

				<Navbar.Toggle className="fa fa-bars icon" aria-controls="responsive-navbar-nav" />

				<Navbar.Collapse className="linksContainer" id="basic-navbar-nav">

					<Nav className="mr-auto">
						<Nav.Link href='/about' className="navLink">About</Nav.Link>
						<Nav.Link onClick={this.handleShow} className="navLink">Sync</Nav.Link>
					</Nav>
					{this.renderModal()}
					<Nav className="navLeft">
						<Nav.Link className="navLink" disabled>
							Credits: {this.props.creditCount}
						</Nav.Link>

						<NavDropdown
							title="Theme"
							className="navDropContainerTheme"
							onSelect={this.props.changeActiveTheme}
						>
							{this.renderThemeChoices()}

						</NavDropdown>

						<NavDropdown
							alignRight
							title={<img className="userProfileImage" alt=""
							src={this.props.user.picture} />}
							className="navDropContainerUser"
						>
							<NavDropdown.Item disabled>
								{this.props.user.display_name}
							</NavDropdown.Item>

							<NavDropdown.Divider />

							<NavDropdown.Item onClick={this.props.doLogout}>Logout</NavDropdown.Item>
						</NavDropdown>
					</Nav>

				</Navbar.Collapse>

			</Navbar>
		)
	}

}

export default CustomNavbar;

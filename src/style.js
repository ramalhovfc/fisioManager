const style = {
	mainLogo: {
		maxWidth: '70%',
		maxHeight: '70%',
		display: 'block',
		margin: '0 auto'
	},
	printLogo: {
		width: '40%',
		height: '40%',
		display: 'block',
		marginTop: '50px',
		marginBottom: '50px',
	},
	userDetailsContainer: {
		margin: '10px'
	},
	userDetailsPrintContainer: {
		margin: '10px',
		maxWidth: '600px',
		fontSize: 20,
	},
	incidentListContainer: {
		marginTop: '40px',
	},
	usernameInUserDetails: {
		textTransform:'uppercase'
	},
	incidentDetailsContainer: {
		margin: '20px',
	},
	noIncidentsIncidentList: {
		fontStyle: 'italic'
	},
	commentBox: {
		width:'80vw',
		margin:'0 auto',
		fontFamily:'Helvetica, sans-serif'
	},
	title: {
		textAlign:'center',
		textTransform:'uppercase'
	},
	commentList: {
		border:'1px solid #e1e1e1',
		padding:'0 12px',
		maxHeight:'70vh',
	},
	userFoundElement: {
		display: 'block',
		margin:'10px',
		padding:'3px 10px',
	},
	userFoundElementLink: {
		textDecoration: 'none',
	},
	userBrowserError: {
		padding: '15px'
	},
	commentForm: {
		margin:'10px',
		display:'flex',
		flexFlow:'row wrap',
		justifyContent:'space-between'
	},
	commentFormAuthor: {
		minWidth:'150px',
		margin:'3px',
		padding:'0 10px',
		borderRadius:'3px',
		height:'40px',
		flex:'2'
	},
	commentFormText: {
		flex:'4',
		margin:'3px',
		padding:'0 10px',
		height:'40px',
		borderRadius:'3px'
	},
	userAddButton: {
		textTransform:'uppercase',
		margin:'5px 3px',
		fontSize:'1rem',
		borderRadius:'3px',
	},
	incidentSaveButton: {
		textTransform:'uppercase',
		margin:'5px 3px',
		fontSize:'1rem',
		borderRadius:'3px',
	},
	userSaveButton: {
		textTransform:'uppercase',
		margin:'5px 3px',
		fontSize:'1rem',
		borderRadius:'3px',
	},
	incidentListElementStartDate: {
		float: 'right'
	},
	commentFormPost: {
		minWidth:'75px',
		flex:'1',
		height:'40px',
		margin:'5px 3px',
		fontSize:'1rem',
		backgroundColor:'#244DB9',
		borderRadius:'3px',
		color:'#fff',
		textTransform:'uppercase',
		letterSpacing:'.055rem',
		border:'none'
	},
	updateLink: {
		textDecoration:'none',
		paddingRight:'15px',
		fontSize:'.7rem'
	},
	deleteLink: {
		textDecoration:'none',
		paddingRight:'15px',
		fontSize:'.7rem',
		color:'red'
	}
};

module.exports = style;
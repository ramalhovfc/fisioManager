const style = {
	mainLogo: {
		maxWidth: '70%',
		maxHeight: '70%',
		display: 'block',
		margin: '0 auto'
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
		overflow:'scroll'
	},
	comment: {
		display: 'block',
		margin:'10px',
		padding:'3px 10px',
		fontSize:'.9rem',
		fontFamily:'Helvetica, sans-serif'
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
	commentFormPost: {
		minWidth:'75px',
		flex:'1',
		height:'40px',
		margin:'5px 3px',
		fontSize:'0.6rem',
		backgroundColor:'#03a9f4',
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
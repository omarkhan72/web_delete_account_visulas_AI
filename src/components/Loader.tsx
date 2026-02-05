import ClipLoader from "react-spinners/ClipLoader";


function LoadingScreen() {
  return (
    <div className="app-container" style={{height:"100%", width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <ClipLoader
        color={"red"}
        loading={true}
        size={20}
        />
    </div>
  )
}

export default LoadingScreen
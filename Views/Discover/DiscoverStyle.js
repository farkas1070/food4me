import { StyleSheet,Dimensions } from 'react-native'


export const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
      },
      itemText: {
        fontSize: 24,
      },
      container: {
        flex: 1,
        backgroundColor: "black",
      },
      pagerView: {
        flex: 1,
      },
      slide: {
        
        flex: 1,
        
        backgroundColor: "black",
    
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      },
      video: {
        width: "100%",
        height: "100%",
      },
      likeButton: {
        position: "absolute",
        bottom: 180,
        right: 10,
    
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
      },
      commentButton: {
        position: "absolute",
        bottom: 100,
        right: 10,
    
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
      },
      volumeButton: {
        position: "absolute",
        top: "47%",
        left: "43%",
        backgroundColor: "rgba(255,255,255,0.5)",
        width: 65,
        height: 65,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        zIndex: -1,
      },
      topContainer: {
        width: "100%",
        position: "absolute",
        top: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: -1,
      },
      backContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 15,
        zIndex: -1,
      },
      reelsText: {
        color: "white",
        fontSize: 22,
        marginLeft: 20,
      },
      plusIcon: {
        marginRight: 15,
      },
      bottomSheetBody: {
        width: "100%",
        height: "100%",
      },
      commentsTextContainer: {
        width: "100%",
    
        backgroundColor: "#262626",
        flexGrow: 1,
      },
      CommentsTitleText: {
        color: "white",
        marginTop: 20,
      },
      commentsText: {
        color: "white",
      },
      commentsTextTitle:{
        color:'white',
        fontWeight:'bold'
      },
      likesCountText: {
        color: "white",
      },
      commentCountText: {
        color: "white",
      },
      infoContainer: {
        position: "absolute",
        left: 10,
        bottom: 90,
        width: "60%",
        zIndex: -1,
      },
      infoText: {
        color: "white",
      },
      userInfoContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
      },
      profileNameText: {
        color: "white",
        marginLeft: 10,
      },
      commentView: {
        width: "100%",
        flexDirection: "row",
        padding: 20,
        marginBottom: 10,
        alignItems: "center",
      },
      commentTextView:{
        marginLeft:20
      },
})
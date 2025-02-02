function UploadDoc() {
  const id = useSelector(state => state.id)
  const [result, setResult] = React.useState([])
  const [docname, setdocname] = useState("")
  // useEffect(() => {
  //   console.log(JSON.stringify(result, null, 2))
  // }, [result])


  const UploadDoc = () => {
    console.log(result)
    var imgName = result[0]["name"]
    var type = result[0]["type"]
    var imgPath = result[0]["fileCopyUri"]
    console.log(imgName)
    console.log(type)
    console.log(imgPath)

    var formData = new FormData();
    formData.append("doc_name", docname);
    formData.append("upload_doc", {
      uri: imgPath,
      type: type,
      name: imgName
    })
    console.log(formData)
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
    axios.post(UPLOAD_DOCUMENT+id, formData, config)
      .then((response) => {
        console.log(response.data.post)
        console.log(response.data.success)
        if (response.data.success) {
          alertBox(APPNAME,"Image Uploaded Successfully")
        }
      })
      .catch((error) => {
        console.log(error)
        alertBox(APPNAME,error.response.data.msg)
      })
  }

  return (
    <View style={{flex:1,justifyContent:'center'}}>
      {/* {/ <Text style={{fontSize:32,fontWeight:'bold'}}>Result: {JSON.stringify(result, null, 2)}</Text> /} */}
      

      <Button
        title="open picker for single file selection"
        onPress={async () => {
          try {
            const pickerResult = await DocumentPicker.pickSingle({
              presentationStyle: 'fullScreen',
              copyTo: 'cachesDirectory',
            })
            setResult([pickerResult])
          } catch (e) {
            handleError(e)
          }
        }}
      />
      <InputField
        selectionColor={colors.light.tint}
        label={"Enter Document Name"}
        values={docname}
        setText={setdocname}
      />
      <CustomButton
        label={"Upload Document"}
        onPress={UploadDoc} />
    </View>
  )
}
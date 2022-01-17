
const createFormData = (dataObject) => {
    const formData = new FormData();
    console.log(dataObject)
    Object.keys(dataObject).forEach(key => formData.append(key, dataObject[key]));
    return formData;
}


export default createFormData
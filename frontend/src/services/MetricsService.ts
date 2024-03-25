import axios from "axios";

export default class MetricsService {
  URL: string = "http://localhost:3000/metrics";

  async UploadFile(file: any) {
    const formData = new FormData();
    formData.append("file", file);

    return await axios
      .post(this.URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("File uploaded successfully", response.status);
        return response;
      })
      .catch((error) => {
        console.error("Error uploading file", error);
        // Handle error
      });
  }

  async FetchData() {
    return await axios
      .get(this.URL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("data successfully fetched", response.status);
        return response;
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        // Handle error
      });
  }
}

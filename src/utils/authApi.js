import httpResponse from "../services/httpResponse";
import httpService from "../services/httpService";

class AuthApi {
  isConnected = true;
  getDataFromServer = (endPoint, config = {}) => {
    this.checkNetwork();

    return httpService.get(endPoint, config).then(
      (response) => {
        return this.responseHandler(response);
      },
      (err) => {
        return this.errorHandler(err);
      }
    );
  };

  postDataToServer = async (endPoint, payload, config = {}) => {
    this.checkNetwork();

    return httpService.post(endPoint, payload, config).then(
      (response) => {
        return this.responseHandler(response);
      },
      (err) => {
        return this.errorHandler(err.response);
      }
    );
  };

  putDataToServer = async (endPoint, payload, config = {}) => {
    this.checkNetwork();
    return httpService.put(endPoint, payload, config).then(
      (response) => {
        return this.responseHandler(response);
      },
      (err) => {
        return this.errorHandler(err.response);
      }
    );
  };

  deleteDataFromServer = async (endPoint, config = {}) => {
    this.checkNetwork();
    return httpService.delete(endPoint, config).then(
      (response) => {
        return this.responseHandler(response);
      },
      (err) => {
        return this.errorHandler(err);
      }
    );
  };
  headDataFromServer = (endPoint, config = {}) => {
    return httpService.head(endPoint, config).then(
      (response) => {
        return this.responseHandler(response);
      },
      (err) => {
        return this.errorHandler(err);
      }
    );
  };
  responseHandler = (response) => {
    if (
      response &&
      ((response.data &&
        (response.data.status === 200 ||
          response.data.status === 201 ||
          response.data.status === 202 ||
          response.data.status === 204 ||
          response.data.code === 202 ||
          response.data.code === 200 ||
          response.data.code === 201 ||
          response.data.code === 204)) ||
        response.status === 201 ||
        response.status === 200 ||
        response.status === 204 ||
        response.data.status === 202 ||
        response.data.code === 202)
    ) {
      httpResponse.data = response.data;
      httpResponse.success = true;
      return httpResponse;
    }
    httpResponse.success = false;
    httpResponse.data = null;
    httpResponse.message =
      response && response.data && response.data.message
        ? response.data.message
        : "Something Went Wrong !";
    return httpResponse;
  };

  errorHandler = (err) => {
    httpResponse.success = false;
    httpResponse.data = null;
    httpResponse.message =
      err && err.data && err.data.errors
        ? err.data.errors[0]
        : "Something Went Wrong !";
    httpResponse.message =
      err && err.data
        ? err.data.message
          ? err.data.message
          : "Something Went Wrong !"
        : err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : "Something Went Wrong !";
    typeof httpResponse.message == "string"
      ? httpResponse.message
      : "Something Went Wrong !";
    return httpResponse;
  };

  checkNetwork = () => {
    if (!this.isConnected) {
      httpResponse.isConnected = this.isConnected;
      httpResponse.message = "Please check your internet connection !";
      httpResponse.data = null;
      httpResponse.success = false;
      httpResponse.error = "Network Error";
      return httpResponse;
    }
  };
}

export default new AuthApi();

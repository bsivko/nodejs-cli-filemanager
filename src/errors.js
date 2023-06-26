const operationErrorMessage = "Operation failed";

class FileManagerError {
    constructor(message) {
      this.message = message;
    }
}

class InputError extends FileManagerError {
    constructor() {
        super("Invalid input");      
    }
}

class OperationError extends FileManagerError {
    constructor() {
        super(operationErrorMessage);      
    }
}
  
export { InputError, OperationError, FileManagerError, operationErrorMessage };

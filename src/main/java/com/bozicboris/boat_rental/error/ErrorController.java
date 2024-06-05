package com.bozicboris.boat_rental.error;


import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ErrorController {

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionModel handleDataIntegrityViolationException(final DataIntegrityViolationException ex, final WebRequest request) {
        ExceptionModel exceptionModel = new ExceptionModel();
        exceptionModel.setName(ex.getClass().getSimpleName());
        exceptionModel.setMessage("Data integrity was breached");
        exceptionModel.setPath(request.getDescription(false));
        return exceptionModel;

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception ex, WebRequest request) {

        ex.printStackTrace();

        ExceptionModel exceptionModel = new ExceptionModel();
        exceptionModel.setName(ex.getClass().getSimpleName());
        exceptionModel.setMessage(ex.getMessage());
        exceptionModel.setPath(request.getDescription(false));

        return new ResponseEntity<>(exceptionModel, HttpStatus.INTERNAL_SERVER_ERROR);
    }


}



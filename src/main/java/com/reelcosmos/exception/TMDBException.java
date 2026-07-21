package com.reelcosmos.exception;

public class TMDBException extends RuntimeException {

    public TMDBException(String message) {
        super(message);
    }

    public TMDBException(String message, Throwable cause) {
        super(message, cause);
    }
}

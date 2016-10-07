export interface AntfarmOptions {
    /**
     * The directory for logs to be saved.
     */
    log_dir?: string;
    /**
     * Max file size for log files.
     */
    log_max_size?: number;
    /**
     * Max number of files for rotating log files.
     */
    log_max_files?: number;
    /**
     * Level of file logging: "debug", "info", "warning", and "error".
     */
    log_file_level?: string;
    /**
     * Level of console logging: "debug", "info", "warning", and "error".
     */
    log_out_level?: string;
    /**
     * Port of server for webhooks.
     */
    port?: number;
    /**
     * Auto managed folder path.
     */
    auto_managed_folder_directory: string;
}
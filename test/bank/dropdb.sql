UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'dumpdb';
SELECT pg_terminate_backend(procpid) FROM pg_stat_activity WHERE datname = 'dumpdb';
DROP DATABASE dumpdb;

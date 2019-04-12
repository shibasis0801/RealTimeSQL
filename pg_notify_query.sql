CREATE OR REPLACE FUNCTION notify_new_friend()
    RETURNS trigger AS
$BODY$
    BEGIN
        PERFORM pg_notify('new_friend', row_to_json(NEW)::text);
        RETURN NULL;
    END;
$BODY$
    LANGUAGE plpgsql VOLATILE
    COST 100


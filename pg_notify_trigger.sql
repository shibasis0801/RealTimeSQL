CREATE TRIGGER notify_new_friend
    AFTER INSERT
    ON "friends"
    FOR EACH ROW 
    EXECUTE PROCEDURE notify_new_friend();
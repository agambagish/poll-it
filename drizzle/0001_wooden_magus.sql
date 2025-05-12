DROP INDEX "votes_user_id_poll_id_index";--> statement-breakpoint
CREATE UNIQUE INDEX "votes_user_id_option_id_index" ON "votes" USING btree ("user_id","option_id");
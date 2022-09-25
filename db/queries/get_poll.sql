SELECT polls.id as id, polls.title as title, polls.description as description, options.name as question
FROM polls
JOIN options ON poll_id = polls.id
WHERE polls.id = 1;

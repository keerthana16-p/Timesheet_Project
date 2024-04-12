{{
    config(
        tags=['staging']
    )
}}

with 
project as (
    select 
    id as Project_Id,
    projectname as Project_Name,
    projecttype as Project_Type,
    priority as Priority
    from {{ source('timesheet', 'projectdetails') }}
)
select * from project
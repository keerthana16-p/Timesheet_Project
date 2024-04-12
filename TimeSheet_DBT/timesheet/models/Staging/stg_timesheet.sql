{{
    config(
        tags=['staging']
    )
}}

with 
timesheet as (
    select 
    username as User_Name,
    email as Email,
    projectname as Project_Name,
    total_hours as Total_hours
    from {{ source('timesheet', 'timesheet') }}
)
select * from timesheet
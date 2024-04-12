{{
    config(
        tags=['staging']
    )
}}

with 
feedback as (
    select 
    username as User_Name,
    projectname as Project_Name,
    guidance as Guidance,
    support as Support
    from {{ source('timesheet', 'internfeedback') }}
)
select * from feedback
<script lang="ts">
    import Textfield from '@smui/textfield'
    import Icon from '@smui/textfield/icon';
    import Button from '@smui/button';

    let username:string = "";
    let password:string = "";
</script>

<main>
    <h1 style="font-size: 16px;margin-bottom: 20px;">Registration panel</h1>

    <div class="panel-container">
        <Textfield
            class="shaped-outlined"
            variant="outlined"
            bind:value={username}
            invalid={username.length < 3}
            label="Username"
            style="height: 50%;"
        >
            <Icon class="material-icons" slot="leadingIcon">person</Icon>
        </Textfield>

        <Textfield
            class="shaped-outlined"
            variant="outlined"
            bind:value={password}
            invalid={!username.length}
            label="Password"
            style="height: 50%;"
            type="password"
        >
            <Icon class="material-icons" slot="leadingIcon">key</Icon>
        </Textfield>

        <Button variant="raised" style="height: 50%; top: 2px;">Register</Button>
    </div>
</main>


<style>
    .panel-container{
        height: 80px;
        display: flex;
        align-items: center;
    }
</style>
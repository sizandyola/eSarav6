<template>
<div class="cardz" @click.prevent="onPay" >
  <form action="https://uat.esewa.com.np/epay/main" method="POST" ref="form">
  <img src="/assets/images/esewa_logo.pngg" class="img-fluid" />
    <!-- <button class="border-0 bg-white">
      
      <button class="btn btn-primary btn-block w-100">Make Payment</button>
    </button> -->
  </form>
  </div>
</template>

<script>
  export default {
    props: ["amount", "order_id"],
    methods: {
      onPay() {
        var path = "https://uat.esewa.com.np/epay/main";
        var params = {
          amt: 10,
          psc: 0,
          pdc: 0,
          txAmt: 0,
          tAmt: 10,
          pid:
            "id" +
            Math.random()
              .toString(16)
              .slice(2),
          scd: "EPAYTEST",

          su: "https://esara.com.np/#/dashboard/payment_response",
          fu: "https://esara.com.np/#/dashboard/payment_response",
        };

        var form = this.$refs["form"];
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);
        for (var key in params) {
          var hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", params[key]);
          form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
      },
    },
  };
</script>

<style></style>
  